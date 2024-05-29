import React, { useState, useEffect } from 'react';
import TermService from '../../services/TermService/TermService';
import Term from '../../model/classes/Term';
import { Session } from '../../model/utils/Session';
import Style from './Term.module.css'; // Importe o arquivo CSS com os estilos

const TermsComponent: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState<Set<number>>(new Set());
  const session = Session();
  const idUser = session.id;

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await TermService.findAllTerms();
        setTerms(response.data);
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    fetchTerms();
  }, []);

  const handleAcceptTerm = (termId: number) => {
    const newAcceptedTerms = new Set(acceptedTerms);
    if (newAcceptedTerms.has(termId)) {
      newAcceptedTerms.delete(termId);
    } else {
      newAcceptedTerms.add(termId);
    }
    setAcceptedTerms(newAcceptedTerms);
  };

  const allTermsAccepted = terms.every(term => acceptedTerms.has(term.id));

  const handleAcceptTerms = () => {
    // Aqui você pode implementar a lógica para enviar a confirmação de aceitação dos termos para o backend
    console.log('Termos aceitos:', acceptedTerms);
  };

  return (
    <div className={Style.terms_container}>
      <h2>Termos de Serviço</h2>
      {terms.map(term => (
        <div key={term.id} className={Style.term}>
          <input
            className={Style.checkbox_input}
            type="checkbox"
            id={`term-${term.id}`}
            checked={acceptedTerms.has(term.id)}
            onChange={() => handleAcceptTerm(term.id)}
          />
          <label htmlFor={`term-${term.id}`}>{term.content}</label>
        </div>
      ))}
      {!allTermsAccepted && (
        <button className={Style.accept_button} onClick={handleAcceptTerms}>
          Aceitar Termos
        </button>
      )}
      {allTermsAccepted && (
        <p className={Style.accepted_terms}>Você aceitou todos os termos.</p>
      )}
    </div>
  );
};

export default TermsComponent;
