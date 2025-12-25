const formatCurrency = (currency: number) => {
  return new Intl.NumberFormat('en', {
    style: "currency",
    currency: "INR",
  }).format(currency);
}
type TableProps = {
  data: Array<Record<string, string | number>>;
  columns: Array<string>;
  quantityLeft?: Record<string, number>;
  setQuantityLeft?: React.Dispatch<React.SetStateAction<{
    Gord: number;
    Glycimet: number;
    Levipil: number;
    Covid: number;
    Somazina: number;
    "A-Z": number;
    "Mecofol Plus": number;

  }>>;
  left?: boolean;
  totalCost?: number;
}
type medicineName = keyof NonNullable<TableProps["quantityLeft"]>;
function Table({ data, columns, quantityLeft, setQuantityLeft, left, totalCost }: TableProps) {
  return (
    <table className="min-h-full md:w-full w-mf table-auto text-center text-mb-secondary-500 tracking-widest divide-y border-b">
      <thead>
        <tr className="divide-x">
          {columns.map((column: string,index:number) => (

            <th className="p-5" key={index}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row,index) => {
          const name = row.Name as medicineName;
          return <tr className={index % 2 ? "divide-x bg-stone-300" : "divide-x"} key={index}>
            <td className="p-5">{name}</td>
            <td className="p-5">{formatCurrency(row.Price as number)}</td>
            <td className="p-5">
              {left && <input type="text" value={quantityLeft![name]} onChange={e => setQuantityLeft!(prev => (
                { ...prev, [name]: Number(e.target.value) }
              ))} className="w-full text-center border-mb-secondary-200 focus:outline-mb-primary-500 border rounded-lg" />}
              {!left && row.needed}
            </td>
          </tr>
        })}
      </tbody>
      {!left && <tfoot>
        <tr className="divide-x">
          <td className="font-bold">Total</td>
          <td className="font-bold">{formatCurrency(Number(totalCost))}</td>
          <td></td>
        </tr>
      </tfoot>}
    </table>
  )
}

export default Table
