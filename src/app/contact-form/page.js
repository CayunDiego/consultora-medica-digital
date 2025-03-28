'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './ContactForm.scss';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [formVisible, setFormVisible] = useState(true);

  const onSubmit = async (data) => {
    console.log(data);
    googleSheet(data)
    sendWA(data)
    setFormVisible(false);
  };

  const handleNewForm = () => {
    reset();
    setFormVisible(true);
  };

  const googleSheet = async (data) => {
    await fetch('/api/contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  const sendWA = (data) => {
    const message = `Nuevo mensaje de ${data.name} ${data.lastName} (${data.email}, ${data.whatsapp}): ${data.message}`;
    const whatsappLink = `https://wa.me/5492974140952?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  }

  return (
    <div>
      {formVisible ? (
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
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
            <label htmlFor="whatsapp">Número de WhatsApp</label>
            <input placeholder='351 123 156' id="whatsapp" {...register('whatsapp', { required: 'Número de WhatsApp es requerido' })} />
            {errors.whatsapp && <p className="error-message">{errors.whatsapp.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea 
              id="message" 
              {...register('message', { required: 'Mensaje es requerido' })}
              placeholder='Contanos que tan listo estás para iniciar, o cualquier duda que te detenga si la sabés...'></textarea>
            {errors.message && <p className="error-message">{errors.message.message}</p>}
          </div>
          <button type="submit">SÍ QUIERO UNA WEB ATRAE PACIENTES</button>
        </form>
      ) : (
        <div className="contact-form success">
          <div className='msj-success'>
            <img
                src="https://www.iconpacks.net/icons/2/free-check-mark-icon-3280-thumb.png"
                alt="Descripción de la imagen"
              />
            <p>¡Gracias por tu mensaje!</p>
          </div>
          <button onClick={handleNewForm}>Enviar nueva consulta</button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;