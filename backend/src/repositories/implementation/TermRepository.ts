import ITermRepository from "../ITermRepository";
import Terms from "../../model/Terms";
import TermAcceptance from "../../model/TermAcceptance";

export default class TermRepository implements ITermRepository {
  // create user
  async saveTerm(terms: Terms): Promise<Terms> {
    await TermAcceptance.update({effective:false, effectiveUntil: new Date()}, {where:{}})    
    return Terms.create({
        content: terms.content,
        effectiveDate: terms.effectiveDate,
        });
  }
  findAllTerms(): Promise<Terms[]> {
    return Terms.findAll();
  }
  async saveTermAcceptance(termAcceptance: TermAcceptance): Promise<TermAcceptance> {
    return TermAcceptance.create({
    userId: termAcceptance.userId,
    termsId: termAcceptance.termsId,
    acceptedAt: new Date(),
    effective: true
    });
  }
  findAllTermAcceptance(): Promise<TermAcceptance[]> {
    return TermAcceptance.findAll();
  }

  findTermAcceptanceByUser(userId: number): Promise<TermAcceptance | null> {
    return TermAcceptance.findOne({ where: { userId: userId, effective:true } });
  }

  async deactivateAcceptance(userId:number): Promise<Number>{
    const response = await TermAcceptance.update({effective:false, effectiveUntil: new Date()}, {where:{userId:userId}}) 
    return response[0]
  }
}