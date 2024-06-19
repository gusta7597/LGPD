import React, { useState, useEffect } from 'react';
import TermService from '../../services/TermService/TermService';
import Term from '../../model/classes/Term';
import { Session } from '../../model/utils/Session';
import Style from './Term.module.css'; // Importe o arquivo CSS com os estilos
import TermAcceptance from '../../model/classes/TermAcceptance';

const TermsComponent: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState<Set<number>>(new Set());
  const [termConditions, setTermConditions] = useState<{ [key: number]: string[] }>({});
  const session = Session();
  const idUser = session.id;

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await TermService.findAllTerms();
        console.log(response)
        setTerms(response.data);
        response.data.forEach((term: { id: number; }) => fetchTermConditions(term.id));
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    };

    fetchTerms();
  }, []);

  const fetchTermConditions = async (termId: number) => {
    try {
      const response = await TermService.findTermConditionByTerm(termId);
      console.log(response)
      setTermConditions(prevState => ({
        ...prevState,
        [termId]: response.data,
      }));
    } catch (error) {
      console.error(`Error fetching conditions for term ${termId}:`, error);
    }
  };

  const handleAcceptTerm = (termId: number) => {
    const newAcceptedTerms = new Set(acceptedTerms);

    if (newAcceptedTerms.has(termId)) {
      newAcceptedTerms.delete(termId);
    } else {
      newAcceptedTerms.add(termId);
    }

    setAcceptedTerms(newAcceptedTerms);
    console.log(newAcceptedTerms);
  };

  const allTermsAccepted = terms.every(term => acceptedTerms.has(term.id));

  const handleAcceptTerms = async () => {
    await TermService.deactivateAcceptance(idUser);
    acceptedTerms.forEach(async termId => {
      console.log(termId);
      // await TermService.createTermAcceptance(termId, idUser);
    });
    window.location.href = "/";
  };

  const revokeTerms = async () => {
    await TermService.deactivateAcceptance(idUser);
    window.localStorage.removeItem("session_token");
    window.open("/auth/login", "_self");
  };

  return (
    <div className={Style.terms_container}>
      <h2>Termos de Serviço</h2>
      <h4>Aceite os termos de serviço para utilizar nossa aplicação</h4>
      <h5>Caso queira revogar todos os termos aceitos basta clicar no botão "Revogar termos"</h5>
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
          {termConditions[term.id] && (
            <ul>
              {termConditions[term.id].map((condition, index) => (
                
                <li key={index}>{condition}</li>
              ))}
              <h1>adlo</h1>
            </ul>
          )}
        </div>
      ))}
      <button className={Style.accept_button} onClick={handleAcceptTerms}>Aceitar Termos</button>
      <div><button className={Style.accept_button} onClick={revokeTerms}>Revogar termos</button></div>
    </div>
  );
};

export default TermsComponent;
