/**
 * Sample data rendered inside the product mockups.
 * These are illustrative values for demonstration only — not real customer
 * or company statistics. Numbers are kept internally consistent
 * (e.g. 218 present + 10 late + 12 on leave + 8 absent = 248 employees).
 */

export const workforce = {
  total: 248,
  present: 218,
  late: 10,
  onLeave: 12,
  absent: 8,
  pendingTasks: 18,
  newThisMonth: 4,
};

export const employees = [
  {
    name: 'Arjun Kumar',
    role: 'Senior Designer',
    department: 'Design',
    status: 'present',
    checkIn: '09:02',
    hours: '7h 48m',
    tasks: 24,
    completed: 21,
    onTime: 92,
    performance: 92,
    today: { done: 6, total: 8 },
  },
  {
    name: 'Priya Sharma',
    role: 'Operations Lead',
    department: 'Operations',
    status: 'present',
    checkIn: '08:51',
    hours: '8h 02m',
    tasks: 28,
    completed: 27,
    onTime: 97,
    performance: 96,
    today: { done: 9, total: 10 },
  },
  {
    name: 'Rahul Raj',
    role: 'Backend Engineer',
    department: 'Engineering',
    status: 'late',
    checkIn: '09:41',
    hours: '7h 05m',
    tasks: 19,
    completed: 15,
    onTime: 81,
    performance: 84,
    today: { done: 4, total: 7 },
  },
  {
    name: 'Meena Devi',
    role: 'HR Executive',
    department: 'HR',
    status: 'leave',
    checkIn: null,
    hours: '—',
    tasks: 16,
    completed: 14,
    onTime: 90,
    performance: 88,
    today: { done: 3, total: 5 },
  },
  {
    name: 'Karthik S',
    role: 'Account Manager',
    department: 'Sales',
    status: 'present',
    checkIn: '08:58',
    hours: '7h 56m',
    tasks: 22,
    completed: 19,
    onTime: 89,
    performance: 90,
    today: { done: 7, total: 9 },
  },
  {
    name: 'Divya Nair',
    role: 'Support Specialist',
    department: 'Support',
    status: 'present',
    checkIn: '08:47',
    hours: '8h 10m',
    tasks: 31,
    completed: 29,
    onTime: 95,
    performance: 94,
    today: { done: 8, total: 9 },
  },
  {
    name: 'Vikram Rao',
    role: 'QA Engineer',
    department: 'Engineering',
    status: 'absent',
    checkIn: null,
    hours: '—',
    tasks: 18,
    completed: 14,
    onTime: 78,
    performance: 80,
    today: { done: 0, total: 4 },
  },
  {
    name: 'Lakshmi Iyer',
    role: 'Finance Analyst',
    department: 'Finance',
    status: 'present',
    checkIn: '08:55',
    hours: '7h 51m',
    tasks: 20,
    completed: 18,
    onTime: 93,
    performance: 91,
    today: { done: 5, total: 6 },
  },
];

/** Headcount and attendance by department — sums to 248 / 218. */
export const departments = [
  { name: 'Engineering', headcount: 64, present: 56, performance: 88 },
  { name: 'Operations', headcount: 52, present: 46, performance: 93 },
  { name: 'Sales', headcount: 38, present: 33, performance: 86 },
  { name: 'Support', headcount: 34, present: 30, performance: 91 },
  { name: 'Finance', headcount: 24, present: 20, performance: 87 },
  { name: 'Design', headcount: 22, present: 20, performance: 92 },
  { name: 'HR', headcount: 14, present: 13, performance: 89 },
];

/** Team performance score, last 8 weeks. */
export const teamPerformance = [78, 81, 80, 84, 83, 87, 89, 91];

/** Tasks assigned vs completed this week. */
export const weeklyTasks = [
  { day: 'Mon', assigned: 22, completed: 18 },
  { day: 'Tue', assigned: 27, completed: 24 },
  { day: 'Wed', assigned: 25, completed: 21 },
  { day: 'Thu', assigned: 30, completed: 27 },
  { day: 'Fri', assigned: 19, completed: 15 },
];

/** Check-ins per 15-minute window. Before 09:15 counts as on time (218), after as late (10). */
export const checkIns = [
  { time: '08:00', count: 16 },
  { time: '08:15', count: 42 },
  { time: '08:30', count: 78 },
  { time: '08:45', count: 58 },
  { time: '09:00', count: 24 },
  { time: '09:15', count: 6, late: true },
  { time: '09:30+', count: 4, late: true },
];
