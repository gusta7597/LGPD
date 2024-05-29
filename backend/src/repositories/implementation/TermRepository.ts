import ITermRepository from "../ITermRepository";
import Terms from "../../model/Terms";
import TermAcceptance from "../../model/TermAcceptance";

export default class TermRepository implements ITermRepository {
  // create user
  saveTerm(terms: Terms): Promise<Terms> {
        return Terms.create({
        content: terms.content,
        effectiveDate: terms.effectiveDate,
        });
  }
  findAllTerms(): Promise<Terms[]> {
    return Terms.findAll();
  }
  saveTermAcceptance(termAcceptance: TermAcceptance): Promise<TermAcceptance> {
    return TermAcceptance.create({
    userId: termAcceptance.userId,
    termsId: termAcceptance.termsId,
    acceptedAt: new Date()
    });
  }
  findAllTermAcceptance(): Promise<TermAcceptance[]> {
    return TermAcceptance.findAll();
  }

  findTermAcceptanceByUser(userId: number): Promise<TermAcceptance | null> {
    return TermAcceptance.findOne({ where: { userId: userId } });
  }
}