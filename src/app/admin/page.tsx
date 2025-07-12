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
        <div className="text-blue-700 text-lg font-semibold">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="w-full max-w-2xl mx-auto rounded-lg shadow-lg p-8 border border-gray-100 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-700">Administrar Documentos</h1>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition-colors"
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
            categorias.map((cat) => (
              <div key={cat.id} className="border border-gray-200 rounded-md p-6 mb-6">
                <div className="font-semibold text-blue-700 mb-2">{cat.nombre}</div>
                <div className="text-gray-500 mb-4">{cat.descripcion}</div>
                {/* List documents for this category */}
                <div className="mb-4">
                  <div className="font-semibold mb-2">Archivos registrados:</div>
                  {documentos.filter(doc => doc.categoria_id === cat.id).length === 0 ? (
                    <div className="text-gray-400 text-sm">No hay archivos en esta categoría.</div>
                  ) : (
                    <ul className="space-y-1">
                      {documentos.filter(doc => doc.categoria_id === cat.id).map(doc => (
                        <li key={doc.id} className="flex items-center gap-2">
                          <span className="text-blue-900 font-medium">{doc.nombre}</span>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Ver/Descargar</a>
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
                  <input type="file" name="file" className="flex-1" required />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-700 text-white font-semibold rounded-md hover:bg-blue-800 transition-colors disabled:opacity-60"
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
