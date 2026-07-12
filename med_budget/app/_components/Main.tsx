'use client';

import { useEffect, useRef, useState } from 'react';
import Table from './Table';
import Calendar from './Calendar';
import { formatDate } from '../_utils/dateFns';
import { useUserContext } from '../_providers/UserProvider';
import { createHash, parseData } from '../_utils/calculationFns';
import Modal from './Modal';
import toast from 'react-hot-toast';

function Main() {
    const { medicineData, patientName, setMedicineData } = useUserContext();
    const [data, setData] = useState<Array<Record<string, string>>>([]); // this is for parsed medicine data
    const [days, setDays] = useState<number>(1);
    const [show, setShow] = useState<boolean>(false);

    const [total, setTotal] = useState<
        Array<{
            Name: string;
            needed: number;
            Price: number;
        }>
    >([]);
    useEffect(() => {
        async function setData() {
            try {
                const hash = await createHash(patientName);
                setMedicineData(localStorage.getItem(`medicines-${hash}`) ?? '');
            }
            catch (error: unknown) {
                toast.error((error instanceof Error && error.message) || "There was an error");
            }
        }
        setData();
    }, [setMedicineData, patientName]);

    useEffect(() => {
        if (medicineData.length) {
            const parsedResult = parseData(medicineData, 4);
            //eslint-disable-next-line
            setData(parsedResult);
        }
    }, [medicineData]);

    const formRef = useRef(null);

    const totalCost = total
        ? total.reduce(
            (
                val: number,
                med: { Name: string; needed: number; Price: number },
            ) => med.Price + val,
            0,
        )
        : 0;
    return (
        <main
            className={`w-lg flex flex-col  gap-y-10  items-center justify-evenly`}
        >
            <Table
                data={data}
                columns={['Medicine', 'Cost', 'Quantity Left']}
                ref={formRef}
                days={days}
                setShow={setShow}
                setTotal={setTotal}
            />
            <Calendar
                ref={formRef}
                days={days}
                setDays={setDays}
                formatDate={formatDate}
            />
            {totalCost > 0 && show && (
                <Modal setShowModal={setShow} showModal={show}>
                    <Modal.Open>

                        <Modal.Window
                            data={total}
                            columns={['Medicine', 'Total Cost', 'Packs Needed']}
                            totalCost={totalCost}
                            days={days}
                            patientName={patientName}
                        ></Modal.Window>
                    </Modal.Open>
                </Modal>
            )}
        </main>
    );
}

export default Main;
