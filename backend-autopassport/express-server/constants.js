const CARS = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Corolla',
    year: 2018,
    mileage: 50000,
    repair_history: [
      { date: '2020-01-10', description: 'Cambio de frenos', cost: 200 },
      { date: '2021-03-22', description: 'Reparación de motor', cost: 500 }
    ],
    maintenance_history: [
      { date: '2019-02-15', description: 'Cambio de aceite', cost: 50 },
      { date: '2020-06-30', description: 'Reemplazo de filtro de aire', cost: 30 }
    ],
    additional_info: {
      owner: 'John Doe',
      last_inspection_date: '2022-04-05',
      is_insured: true,
      insurance_expiration: '2023-05-31',
      notes: 'El auto está en buen estado general, se recomienda realizar un servicio de mantenimiento en los próximos meses.'
    }
  },
  {
    id: 2,
    brand: 'Honda',
    model: 'Civic',
    year: 2015,
    mileage: 80000,
    repair_history: [
      { date: '2017-12-05', description: 'Reemplazo de batería', cost: 150 },
      { date: '2019-08-20', description: 'Arreglo de sistema de escape', cost: 300 },
      { date: '2022-01-18', description: 'Reparación de sistema de frenos', cost: 250 }
    ],
    maintenance_history: [
      { date: '2016-06-15', description: 'Cambio de aceite', cost: 40 },
      { date: '2017-09-30', description: 'Reemplazo de filtro de aire', cost: 25 },
      { date: '2021-03-10', description: 'Cambio de bujías', cost: 60 }
    ],
    additional_info: {
      owner: 'Jane Smith',
      last_inspection_date: '2022-10-20',
      is_insured: false,
      notes: 'El auto ha tenido algunos problemas en el pasado, pero actualmente está en buen estado después de las últimas reparaciones.'
    }
  },
  {
    id: 3,
    brand: 'Ford',
    model: 'Focus',
    year: 2019,
    mileage: 35000,
    repair_history: [
      { date: '2020-07-12', description: 'Reparación de sistema eléctrico', cost: 180 },
      { date: '2021-10-05', description: 'Cambio de sensor de oxígeno', cost: 120 }
    ],
    maintenance_history: [
      { date: '2020-02-20', description: 'Cambio de aceite', cost: 60 },
      { date: '2021-06-15', description: 'Reemplazo de filtro de aire', cost: 30 },
      { date: '2022-03-10', description: 'Alineación y balanceo', cost: 80 }
    ],
    additional_info: {
      owner: 'Robert Johnson',
      last_inspection_date: '2022-12-15',
      is_insured: true,
      insurance_expiration: '2023-12-31',
      notes: 'El auto ha sido bien mantenido y no ha tenido problemas graves.'
    }
  },
  {
    id: 4,
    brand: 'Chevrolet',
    model: 'Cruze',
    year: 2017,
    mileage: 60000,
    repair_history: [
      { date: '2018-09-05', description: 'Reparación de sistema de refrigeración', cost: 300 },
      { date: '2020-05-18', description: 'Cambio de alternador', cost: 250 },
      { date: '2022-02-22', description: 'Reemplazo de bomba de agua', cost: 200 }
    ],
    maintenance_history: [
      { date: '2017-12-30', description: 'Cambio de aceite', cost: 50 },
      { date: '2019-06-20', description: 'Reemplazo de filtro de aire', cost: 25 },
      { date: '2021-02-10', description: 'Cambio de bujías', cost: 60 }
    ],
    additional_info: {
      owner: 'Maria Lopez',
      last_inspection_date: '2022-08-10',
      is_insured: true,
      insurance_expiration: '2023-09-30',
      notes: 'El auto ha tenido algunas reparaciones, pero actualmente está en buen estado.'
    }
  },
  {
    id: 5,
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2016,
    mileage: 70000,
    repair_history: [
      { date: '2017-07-18', description: 'Reparación de sistema de dirección', cost: 180 },
      { date: '2019-10-25', description: 'Cambio de batería', cost: 150 },
      { date: '2021-04-05', description: 'Reemplazo de sistema de escape', cost: 300 }
    ],
    maintenance_history: [
      { date: '2016-12-15', description: 'Cambio de aceite', cost: 60 },
      { date: '2018-06-20', description: 'Reemplazo de filtro de aire', cost: 30 },
      { date: '2020-03-10', description: 'Alineación y balanceo', cost: 80 }
    ],
    additional_info: {
      owner: 'Michael Brown',
      last_inspection_date: '2022-09-25',
      is_insured: false,
      notes: 'El auto ha tenido un mantenimiento regular y está en buen estado.'
    }
  },
  {
    id: 6,
    brand: 'BMW',
    model: 'Series 3',
    year: 2019,
    mileage: 40000,
    repair_history: [
      { date: '2020-03-08', description: 'Cambio de frenos', cost: 350 },
      { date: '2021-08-15', description: 'Reparación de sistema de suspensión', cost: 500 }
    ],
    maintenance_history: [
      { date: '2019-06-10', description: 'Cambio de aceite', cost: 80 },
      { date: '2020-12-20', description: 'Reemplazo de filtro de aire', cost: 40 },
      { date: '2022-03-05', description: 'Cambio de bujías', cost: 120 },
      { date: '2022-11-18', description: 'Reemplazo de neumáticos', cost: 600 }
    ],
    additional_info: {
      owner: 'Emily Davis',
      last_inspection_date: '2022-10-05',
      is_insured: true,
      insurance_expiration: '2023-11-30',
      notes: 'El auto ha sido bien cuidado y se encuentra en excelente estado.'
    }
  },
  {
    id: 7,
    brand: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2017,
    mileage: 55000,
    repair_history: [
      { date: '2018-12-10', description: 'Reparación de sistema de frenos', cost: 400 },
      { date: '2020-07-22', description: 'Cambio de sensor de oxígeno', cost: 150 },
      { date: '2021-11-18', description: 'Reemplazo de sistema de suspensión', cost: 800 }
    ],
    maintenance_history: [
      { date: '2017-11-25', description: 'Cambio de aceite', cost: 100 },
      { date: '2019-05-30', description: 'Reemplazo de filtro de aire', cost: 50 },
      { date: '2020-12-15', description: 'Alineación y balanceo', cost: 120 }
    ],
    additional_info: {
      owner: 'Thomas Wilson',
      last_inspection_date: '2022-07-15',
      is_insured: true,
      insurance_expiration: '2023-08-31',
      notes: 'El auto ha recibido mantenimiento regular y se encuentra en buen estado general.'
    }
  },
  {
    id: 8,
    brand: 'Nissan',
    model: 'Sentra',
    year: 2014,
    mileage: 90000,
    repair_history: [
      { date: '2016-05-08', description: 'Reparación de sistema de dirección', cost: 250 },
      { date: '2018-09-12', description: 'Cambio de alternador', cost: 200 },
      { date: '2020-06-20', description: 'Reemplazo de sistema de escape', cost: 350 }
    ],
    maintenance_history: [
      { date: '2015-10-20', description: 'Cambio de aceite', cost: 40 },
      { date: '2017-04-15', description: 'Reemplazo de filtro de aire', cost: 20 },
      { date: '2019-01-10', description: 'Cambio de bujías', cost: 50 }
    ],
    additional_info: {
      owner: 'Olivia Taylor',
      last_inspection_date: '2022-06-10',
      is_insured: false,
      notes: 'El auto ha tenido algunas reparaciones en el pasado, pero actualmente está en buen estado.'
    }
  }];

const BRANDS = [
  { id: 1, name: 'Toyota' },
  { id: 2, name: 'Honda' },
  { id: 3, name: 'Ford' },
  { id: 4, name: 'Chevrolet' },
  { id: 5, name: 'Volkswagen' },
  { id: 6, name: 'BMW' },
  { id: 7, name: 'Mercedes-Benz' },
  { id: 8, name: 'Nissan' },
  { id: 9, name: 'Audi' },
  { id: 10, name: 'Hyundai' },
  { id: 11, name: 'Kia' },
  { id: 12, name: 'Mazda' },
  { id: 13, name: 'Subaru' },
  { id: 14, name: 'Lexus' },
  { id: 15, name: 'Mitsubishi' },
  { id: 16, name: 'Chrysler' },
  { id: 17, name: 'Dodge' },
];

module.exports = {
  CARS,
  BRANDS
};