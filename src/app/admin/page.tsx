'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabaseClient';

interface Categoria {
  id: number;
  nombre: string;
  descripcion?: string;
}

interface Documento {
  id: string;
  nombre: string;
  url: string;
  categoria_id: number;
  created_at?: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Auth protection
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace('/login');
      } else {
        setLoading(false);
      }
    };
    checkSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace('/login');
      }
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  // Fetch categories and documentos
  useEffect(() => {
    async function fetchAll() {
      setError(null);
      const [{ data: categoriasData, error: catError }, { data: docsData, error: docError }] = await Promise.all([
        supabase.from('categorias').select('*').order('nombre'),
        supabase.from('documentos').select('*').order('created_at', { ascending: false }),
      ]);
      if (catError || docError) setError('Error cargando categorías o documentos');
      else {
        setCategorias(categoriasData || []);
        setDocumentos(docsData || []);
      }
    }
    fetchAll();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleDeleteDocument = async (doc: Documento) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar el documento "${doc.nombre}"?`)) {
      return;
    }

    setDeletingId(doc.id);
    setError(null);
    setSuccess(null);

    try {
      // Extract the file path from the URL
      const url = new URL(doc.url);
      const pathParts = url.pathname.split('/');
      const bucketName = pathParts[1]; // Should be 'documentos'
      const filePath = pathParts.slice(2).join('/');

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (storageError) {
        console.error('Error deleting file from storage:', storageError);
        // Continue anyway to delete the database record
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('documentos')
        .delete()
        .eq('id', doc.id);

      if (dbError) {
        setError('Error eliminando el documento: ' + dbError.message);
        setDeletingId(null);
        return;
      }

      setSuccess('Documento eliminado correctamente.');
      
      // Update the documents list
      const { data: docsData } = await supabase
        .from('documentos')
        .select('*')
        .order('created_at', { ascending: false });
      
      setDocumentos(docsData || []);
    } catch (error) {
      setError('Error inesperado al eliminar el documento.');
      console.error('Error deleting document:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>, categoria: Categoria) => {
    e.preventDefault();
    setUploadingId(categoria.id);
    setError(null);
    setSuccess(null);
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem('file') as HTMLInputElement;
    const customNameInput = form.elements.namedItem('customName') as HTMLInputElement;
    if (!fileInput?.files?.[0]) {
      setError('Selecciona un archivo.');
      setUploadingId(null);
      return;
    }
    if (!customNameInput?.value) {
      setError('Ingresa un nombre para el documento.');
      setUploadingId(null);
      return;
    }
    const file = fileInput.files[0];
    const customName = customNameInput.value;
    // Upload to Supabase Storage (bucket: 'documentos')
    const filePath = `${categoria.id}/${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage.from('documentos').upload(filePath, file);
    if (uploadError) {
      setError('Error subiendo archivo: ' + uploadError.message);
      setUploadingId(null);
      return;
    }
    // Get public URL
    const { data: urlData } = supabase.storage.from('documentos').getPublicUrl(filePath);
    // Register in DB
    const { error: insertError } = await supabase.from('documentos').insert([
      {
        nombre: customName,
        url: urlData?.publicUrl || '',
        categoria_id: categoria.id,
      },
    ]);
    if (insertError) {
      setError('Error registrando documento en la base de datos.');
      setUploadingId(null);
      return;
    }
    setSuccess('Archivo subido correctamente.');
    setUploadingId(null);
    form.reset();
    // Refresh document list
    const { data: docsData, error: docError } = await supabase.from('documentos').select('*').order('created_at', { ascending: false });
    if (!docError) setDocumentos(docsData || []);
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-[#712442] text-lg font-semibold">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="w-full max-w-2xl mx-auto rounded-lg shadow-lg p-8 border border-gray-100 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#712442]">Administrar Documentos</h1>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-[#712442] text-white font-semibold rounded-md hover:bg-[#712442]/80 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
        <div className="space-y-8">
          {categorias.length === 0 ? (
            <div className="text-gray-500 text-center">No hay categorías registradas.</div>
          ) : (
            [...categorias].reverse().map((cat) => (
              <div key={cat.id} className="border border-gray-200 rounded-md p-6 mb-6">
                <div className="font-semibold text-[#712442] mb-2">{cat.nombre}</div>
                <div className="text-gray-500 mb-4">{cat.descripcion}</div>
                {/* List documents for this category */}
                <div className="mb-4">
                  <div className="font-semibold mb-2">Archivos registrados:</div>
                  {documentos.filter(doc => doc.categoria_id === cat.id).length === 0 ? (
                    <div className="flex items-center justify-center p-4 bg-gray-50 border border-dashed border-gray-300 rounded-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                      <span className="text-gray-500">No se han elegido documentos para esta categoría</span>
                    </div>
                  ) : (
                    <ul className="space-y-1">
                      {documentos.filter(doc => doc.categoria_id === cat.id).map(doc => (
                        <li key={doc.id} className="flex items-center gap-2 justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[#712442]/90 font-medium">{doc.nombre}</span>
                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-[#712442]/70 underline hover:text-[#712442]/80">Ver/Descargar</a>
                          </div>
                          <button 
                            type="button"
                            className="p-1 text-red-500 hover:text-red-700 transition-colors"
                            onClick={() => handleDeleteDocument(doc)}
                            disabled={deletingId === doc.id}
                          >
                            {deletingId === doc.id ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* Upload form */}
                <form className="flex flex-col sm:flex-row gap-3 items-center" onSubmit={e => handleUpload(e, cat)}>
                  <input
                    type="text"
                    name="customName"
                    placeholder="Nombre del documento"
                    className="flex-1 px-2 py-1 border border-gray-300 rounded"
                    required
                  />
                  <div className="flex-1 relative">
                    <label className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors w-full overflow-hidden whitespace-nowrap">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#712442]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <span className="text-sm truncate">Elegir documento</span>
                      <input 
                        type="file" 
                        name="file" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                        required 
                        onChange={(e) => {
                          // Update the label text with the selected file name
                          if (e.target.files && e.target.files[0]) {
                            const fileName = e.target.files[0].name;
                            const label = e.target.previousElementSibling as HTMLElement;
                            if (label && label.tagName === 'SPAN') {
                              label.textContent = fileName.length > 20 ? fileName.substring(0, 17) + '...' : fileName;
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="py-2 px-4 bg-[#712442] text-white font-semibold rounded-md hover:bg-[#712442]/80 transition-colors disabled:opacity-60"
                    disabled={uploadingId === cat.id}
                  >
                    {uploadingId === cat.id ? 'Subiendo...' : 'Subir archivo'}
                  </button>
                </form>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
