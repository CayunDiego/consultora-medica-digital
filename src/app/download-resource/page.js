'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import './DownloadResource.scss'

const DownloadResource = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [formVisible, setFormVisible] = useState(true);
  

  const onSubmit = (data) => {
    console.log(data)
    downloadPDF()
    googleSheet(data)
    setFormVisible(false);
  }

  const handleNewForm = () => {
    reset();
    setFormVisible(true);
  };

  const googleSheet = async (data) => {
    await fetch('/api/download-resource', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  const downloadPDF = async () => {
    try {
      const pdfUrl = 'https://framerusercontent.com/assets/mpO0gLCYhtmp1nOoshVq3hr3lzc.pdf';
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '3 Errores Legales que Todo Cirujano Plástico debe Evitar en su Web - Ebook.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to fetch PDF:', error);
    }
  };

  return (
    <div>
      {formVisible ? (
        <form onSubmit={handleSubmit(onSubmit)} className="download-form">
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input placeholder="Jane" id="name" {...register('name', { required: 'Nombre es requerido' })} />
            {errors.name && <p className="error-message">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellido</label>
            <input placeholder="Smith" id="lastName" {...register('lastName', { required: 'Apellido es requerido' })} />
            {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email para contactarte</label>
            <input placeholder='email@email.com' id="email" {...register('email', { required: 'Email es requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })} />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="whatsapp">Número de WhatsApp (opcional)</label>
            <input placeholder='351 123 156' id="whatsapp" {...register('whatsapp')} />
            {errors.whatsapp && <p className="error-message">{errors.whatsapp.message}</p>}
          </div>
          <button type="submit">Descargar PDF</button>
        </form>
      ) : (
        <div className="download-form success">
          <div className='msj-success'>
            <img
                src="https://www.iconpacks.net/icons/2/free-check-mark-icon-3280-thumb.png"
                alt="Descripción de la imagen"
              />
            <p>¡Gracias por la descarga!</p>
          </div>
          <button onClick={handleNewForm}>Volver</button>
        </div>
      )}
    </div>
  )
}

export default DownloadResource
