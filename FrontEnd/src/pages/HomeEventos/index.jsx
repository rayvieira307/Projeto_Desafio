import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/SideBar/index'; 
import styles from './HomeEventos.module.css'; 
import { AuthContext } from '../../context/Auth';
import axios from 'axios'; 

export const HomeEventos = () => {
  const [events, setEvents] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

 /*  useEffect(() => {
    // Verificar se o idAdmin do usuário está disponível antes de fazer a requisição
    if (user && user.idAdmin) {
      // Fazer a requisição para buscar eventos para o admin
      axios.get(`http://localhost:8080/evento/eventos/${user.idAdmin}`)
        .then(response => {
          setEvents(response.data); // Atualizar o estado com os eventos
        })
        .catch(error => {
          console.error('Erro ao carregar eventos:', error);
        });
    } else {
      console.error('ID do administrador não encontrado');
      navigate("/"); 
    }
  }, [user, navigate]);  */

  return (
    <div>
      <Sidebar />
      {events.length > 0 ? (
        <div>
          {events.map(event => (
            <div key={event.idEvento} style={{ marginBottom: '20px' }}>
              <img
                src={event.imagem}
                alt={event.nome_evento}
                style={{ width: '200px', height: '150px', objectFit: 'cover' }}
              />
              <h2>{event.nome_evento}</h2>
              <p>{event.date} - {event.localizacao}</p>
            </div>
          ))}
        
          <button onClick={() => navigate('/events')}>Ver Todos os Eventos</button>
        </div>
      ) : (
        <div>
          <p className={styles.msg}>Não há eventos cadastrados.</p>
          <button className={styles.buttonCriar} onClick={() => navigate('/create-event')}>Criar Evento</button>
        </div>
      )}
    </div>
  );
};