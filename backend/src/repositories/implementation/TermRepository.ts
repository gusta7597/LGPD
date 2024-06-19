import ITermRepository from "../ITermRepository";
import Terms from "../../model/Terms";
import TermAcceptance from "../../model/TermAcceptance";
import TermCondition from "../../model/TermCondition";
import TermConditionAcceptance from "../../model/TermConditionAcceptance";

export default class TermRepository implements ITermRepository {
  // create user
  async saveTerm(term: any): Promise<any> {
    // await TermAcceptance.update({effective:false, effectiveUntil: new Date()}, {where:{}})   
    await Terms.create({
      title: term.title,
      description: term.description,
      conditions: term.conditions.map((condition: { conditionText: any; }) => ({
          conditionText: condition.conditionText,
      })),
      active:true,
  }, {
      include: [TermCondition],
  });
}
  findAllTerms(): Promise<Terms[]> {
    return Terms.findAll();
  }
  async saveTermAcceptance(termId: number, userId: number, accepted: boolean, conditionAcceptances: TermConditionAcceptance[]): Promise<TermAcceptance> {
    
    return TermAcceptance.create({
      userId: userId,
      termId: termId,
      accepted:accepted,
    });
  }
  findAllTermAcceptance(): Promise<TermAcceptance[]> {
    return TermAcceptance.findAll();
  }

  findTermAcceptanceByUser(userId: number): Promise<TermAcceptance | null> {
    return TermAcceptance.findOne({ where: { userId: userId, accepted:true } });
  }

  findTermAcceptanceById(acceptanceId: number): Promise<TermAcceptance | null> {
    return TermAcceptance.findOne({ where: { id: acceptanceId, accepted:true } });
  }

  async saveTermConditionAcceptance(termAcceptanceId:number, termConditionId: number, accepted: boolean){
    return TermConditionAcceptance.create({
      termAcceptanceId:termAcceptanceId,
      termConditionId:termConditionId,
      accepted:accepted
  })
  }
  
  findTermConditionByTerm(termId:number): Promise<TermCondition[]> {
    return TermCondition.findAll({ where: { termId: termId } });
  }

  findTermConditionAcceptanceByAcceptance(termAcceptanceId:number): Promise<TermCondition[]> {
    return TermCondition.findAll({ where: { termAcceptanceId: termAcceptanceId } });
  }

  async deactivateAcceptance(userId:number): Promise<Number>{
    const response = await TermAcceptance.update({accepted:false}, {where:{userId:userId}}) 
    return response[0]
  }

  async deactivateTerm(termId:number): Promise<Number>{
    const response = await Terms.update({active:false}, {where:{termId:termId}}) 
    return response[0]
  }
}