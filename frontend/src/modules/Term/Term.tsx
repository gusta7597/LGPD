import React, { useState, useEffect } from 'react';
import TermService from '../../services/TermService/TermService';
import Term from '../../model/classes/Term';
import { Session } from '../../model/utils/Session';
import Style from './Term.module.css'; // Importe o arquivo CSS com os estilos
import TermAcceptance from '../../model/classes/TermAcceptance';

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

  const handleAcceptTerms = async () => {
    console.log(acceptedTerms,'pau')
    const response = await TermService.deactivateAcceptance(idUser);
    acceptedTerms.forEach(async termId => {
      const teste = new TermAcceptance(new Date(),idUser,termId,true, new Date())
      await TermService.createTermAcceptance(teste)
    })
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

        <button className={Style.accept_button} onClick={handleAcceptTerms}>
          Aceitar Termos
        </button>

    </div>
  );
};

export default TermsComponent;
