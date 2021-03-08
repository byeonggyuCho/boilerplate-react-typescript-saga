
/**
 * brand reducer 구조와 동일해야한다.
 */
const DEMO_DATA: any = {
  ['GET_BRAND_USER_TYPE_REQUEST']: [
    { level: 1, userType: 'boss', userTypeName: 'boss', active: true },
    { level: 2, userType: 'partner', userTypeName: 'partner', active: false },
    { level: 3, userType: 'manager', userTypeName: 'manager', active: true },
    {
      level: 4,
      userType: 'employee',
      userTypeName: 'employee',
      active: false,
    },
    { level: 5, userType: 'staff', userTypeName: 'staff', active: true },
  ],

};

export default DEMO_DATA;
