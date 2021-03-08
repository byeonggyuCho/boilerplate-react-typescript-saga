export type PlanType = 'TRIAL' | 'USED' | 'FREE' | 'BASIC' | 'PRO' | 'EXPERT';

export type PaidPlan = 'BASIC' | 'PRO' | 'EXPERT';
export type FreePlan = 'TRIAL' | 'FREE';
const planMap = new Map<PlanType, string>();

planMap
  .set('TRIAL', 'TRIAL')
  .set('FREE', 'FREE')
  .set('BASIC', 'BASIC')

export default planMap;
