import { useState } from 'react';
import Table from './Table';
import Calendar from './Calendar';

type medicineName = keyof NonNullable<{
  Gord: 6;
  Glycimet: 6;
  Levipil: 6;
  Covid: 6;
  Somazina: 6;
  'A-Z': 6;
  'Mecofol Plus': 6;
  Rozustat: 6;
}>;
const formatDate = (date: string) => {
  return new Intl.DateTimeFormat('en-CA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date));
};
const medicines: Array<Record<string, string | number>> = [
  {
    Name: 'Gord',
    Price: 40,
    perPack: 10,
    perDay: 1,
  },
  {
    Name: 'Glycimet',
    Price: 11,
    perPack: 10,
    perDay: 2,
  },
  {
    Name: 'Levipil',
    Price: 68,
    perPack: 10,
    perDay: 2,
  },
  {
    Name: 'Covid',
    Price: 35,
    perPack: 15,
    perDay: 2,
  },
  {
    Name: 'Somazina',
    Price: 221,
    perPack: 10,
    perDay: 2,
  },
  {
    Name: 'A-Z',
    Price: 50,
    perPack: 15,
    perDay: 1,
  },
  {
    Name: 'Mecofol Plus',
    Price: 70,
    perPack: 10,
    perDay: 1,
  }, {
    Name: 'Rozustat',
    Price: 260,
    perPack: 10,
    perDay: 1,
  },
];

function Main() {
  const [days, setDays] = useState<number>(1);
  const [date, setDate] = useState(() => formatDate(new Date().toDateString()));
  const [quantityLeft, setQuantityLeft] = useState({
    Gord: 6,
    Glycimet: 6,
    Levipil: 6,
    Covid: 6,
    Somazina: 6,
    'A-Z': 6,
    'Mecofol Plus': 6,
    Rozustat: 6
  });
  const [total, setTotal] = useState<
    Array<{
      Name: medicineName;
      needed: number;
      Price: number;
    }>
  >([]);

  const calculateTotal = () => {
    const totalArray = medicines.map((medicine) => {
      const { perDay, perPack, Price } = medicine;
      const name = medicine.Name as medicineName;
      const left = Math.round(
        days - Number(quantityLeft[name] / Number(perDay))
      );
      let needed = left * Number(perDay);
      needed = Math.ceil(needed / Number(perPack));
      return { Name: name, needed, Price: needed * Number(Price) };
    });
    setTotal(totalArray);
  };
  const totalCost = total ? total.reduce((val: number, med: { Name: medicineName; needed: number; Price: number; }) => med.Price + val, 0) : 0;
  return (
    <main className="min-w-full min-h-screen px-10 flex flex-col flex-wrap gap-10 self-start items-center justify-evenly">
      <Table
        data={medicines}
        columns={['Medicine', 'Cost', 'Quantity Left']}
        quantityLeft={quantityLeft}
        setQuantityLeft={setQuantityLeft}
        left
      />
      <Calendar onClick={calculateTotal} date={date} setDate={setDate} days={days} setDays={setDays} formatDate={formatDate} />
      {totalCost > 0 && (
        <Table
          data={total}
          columns={['Medicine', 'Total Cost', 'Packs Needed']}
          totalCost={totalCost}
        />
      )}
    </main>
  );
}

export default Main;
