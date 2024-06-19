import React, { useState, useEffect } from 'react';
import TermService from '../../services/TermService/TermService';
import Term from '../../model/classes/Term';
import { Session } from '../../model/utils/Session';
import Style from './Term.module.css'; // Importe o arquivo CSS com os estilos
import TermAcceptance from '../../model/classes/TermAcceptance';

const TermsComponent: React.FC = () => {
  const [terms, setTerms] = useState<Term[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState<Set<number>>(new Set());
  const [termConditions, setTermConditions] = useState<{ [key: number]: any[] }>({});
  const [checkedConditions, setCheckedConditions] = useState<{ [key: number]: boolean }>({});
  const session = Session();
  const idUser = session.id;

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await TermService.findAllTerms();
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
      setTermConditions(prevState => ({
        ...prevState,
        [termId]: response.data,
      }));
      const defaultConditions = response.data.reduce((acc: { [key: number]: boolean }, condition: { id: number; }) => {
        acc[condition.id] = false;
        return acc;
      }, {});
      setCheckedConditions(prevState => ({
        ...prevState,
        ...defaultConditions,
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
    // console.log(newAcceptedTerms);
  };

  const handleConditionChange = (conditionId: number) => {
    setCheckedConditions(prevState => ({
      ...prevState,
      [conditionId]: !prevState[conditionId],
    }));
  };

  const allTermsAccepted = terms.every(term => acceptedTerms.has(term.id));

  const handleAcceptTerms = async () => {
      let conditionAcceptanceArray = [];
      let idToResponseMap: { [key: string]: number } = {}; // Definindo um tipo para o objeto
      await TermService.deactivateAcceptance(session.id)
      for (const i in checkedConditions) {
          const response = await TermService.findTermConditionById(Number(i));
          console.log(response)
          await TermService.createTermAcceptance(response.data.termId, session.id, checkedConditions[i], Number(i));
      }
  
      console.log(idToResponseMap); // Aqui você terá o objeto desejado


    // const response = await TermService.findTermConditionById(Number(Object.keys(checkedConditions)[0]));
    // const termId = response.data.termId;
    // console.log(termId, session.id, true, conditionAcceptanceArray)
    

    // window.location.href = "/";
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
          <label htmlFor={`term-${term.id}`}>
            {typeof term.description === 'string' ? term.description : JSON.stringify(term.description)}
          </label>
          {termConditions[term.id] && (
            <ul>
              {termConditions[term.id].map((condition: { id: number; conditionText: string }) => (
                <li key={condition.id}>
                  <input
                    type="checkbox"
                    id={`condition-${condition.id}`}
                    checked={checkedConditions[condition.id]  || false}
                    onChange={() => handleConditionChange(condition.id)}
                  />
                  <label htmlFor={`condition-${condition.id}`}>
                    {condition.conditionText}
                  </label>
                </li>
              ))}
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
