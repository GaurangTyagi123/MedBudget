'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useUserContext } from '../_providers/UserProvider';
import { createHash } from '../_utils/calculationFns';
import toast from 'react-hot-toast';

function InfoForm({
    defaultValues,
    initialFields = 0,
    immutable = false,
}: {
    defaultValues?: Record<string, string>;
    initialFields?: number;
    immutable?: boolean;
}) {
    const [numOfFields, setNumOfFields] = useState(initialFields);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Record<string, string>>({
        defaultValues: defaultValues ?? undefined,
    });
    const { setMedicineData, patientName } = useUserContext();

    async function onSubmit(data: FieldValues) {
        if (patientName.length) {
            try {
                const hash = await createHash(patientName);
                localStorage.setItem(`medicines-${hash}`, JSON.stringify(data));
                setMedicineData(JSON.stringify(data));
                reset();
                toast.success("Details stored!!")
                router.replace('/order');
            }
            catch (error: unknown) {
                toast.error(((error instanceof Error) && error.message) || "There was an error");
            }
        }
    }
    return (
        <>
            <div className="space-y-5 relative">
                <h1 className="my-10 text-center text-5xl uppercase tracking-widest font-extralight ">
                    Add your Medicines
                </h1>
                <div className="min-w-full h-fit grid grid-cols-4 place-items-center mt-5 ">
                    <span className="font-bold">Medicine Name</span>
                    <span className="font-bold">Medicine Price</span>
                    <span className="font-bold">Quantity Per Pack</span>
                    <span className="font-bold">Quantity Per Dose </span>
                </div>
                <form
                    className="flex flex-col items-center justify-evenly w-full gap-y-3"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="w-full flex items-center justify-evenly gap-x-4">
                        <div className="flex flex-col items-center justify-between gap-y-2 w-lg h-20">
                            <input
                                autoComplete="off"
                                type="text"
                                id="medicineName"
                                className="form_input ml-5"
                                {...register('medicineName', {
                                    minLength: {
                                        value: 2,
                                        message:
                                            'Name should have at least 2 characters',
                                    },
                                    required:
                                        'Please enter a name for the medicine',
                                    validate: (value) => {
                                        return (
                                            /[a-zA-Z0-9]+/.test(value) ||
                                            'Name should be alphanumeric'
                                        );
                                    },
                                })}
                            />
                            {errors?.medicineName?.message && (
                                <span className="text-red-500 font-bold text-xs uppercase">
                                    {errors.medicineName.message.toString()}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col items-center justify-between gap-y-2 w-lg h-20">
                            <input
                                autoComplete="off"
                                type="text"
                                id="medicinePrice"
                                defaultValue={1}
                                className="form_input"
                                {...register('medicinePrice', {
                                    valueAsNumber: true,
                                    required:
                                        'Please enter price for the medicine',
                                    min: {
                                        value: 1,
                                        message:
                                            'Value should be greater than 0',
                                    },
                                })}
                            />
                            {errors?.medicinePrice?.message && (
                                <span className="text-red-500 font-bold text-xs uppercase">
                                    {errors.medicinePrice.message.toString()}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col items-center justify-between gap-y-2 w-lg h-20">
                            <input
                                autoComplete="off"
                                type="text"
                                id="quantityPerPack"
                                defaultValue={1}
                                className="form_input"
                                {...register('quantityPerPack', {
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message:
                                            'Please enter quantity per pack',
                                    },
                                    required: 'Please enter quantity per pack',
                                })}
                            />
                            {errors?.quantityPerPack?.message && (
                                <span className="text-red-500 font-bold text-xs uppercase">
                                    {' '}
                                    {errors.quantityPerPack.message.toString()}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col items-center justify-between gap-y-2 w-lg h-20">
                            <input
                                autoComplete="off"
                                type="text"
                                id="quantityPerDose"
                                className="form_input mr-5 w-lg"
                                defaultValue={1}
                                {...register('quantityPerDose', {
                                    valueAsNumber: true,
                                    required: 'Please enter dose taken per day',
                                    min: {
                                        value: 1,
                                        message:
                                            'quantity should be greater than 0',
                                    },
                                })}
                            />
                            {errors?.quantityPerDose?.message && (
                                <span className="text-red-500 font-bold uppercase text-xs">
                                    {' '}
                                    {errors.quantityPerDose.message.toString()}
                                </span>
                            )}
                        </div>
                    </div>
                    {Array.from({ length: numOfFields }, (_, i) => i).map(
                        (index) => {
                            return (
                                <div
                                    className="w-screen flex items-center justify-evenly  gap-x-4"
                                    key={index + 1}
                                >
                                    <div className="flex flex-col items-center justify-between gap-y-2 w-lg h-20">
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            id={`medicineName-${index + 1}`}
                                            className="form_input ml-5"
                                            required
                                            {...register(
                                                `medicineName-${index + 1}`,
                                                {
                                                    minLength: {
                                                        value: 2,
                                                        message:
                                                            'Name should have at least 2 characters',
                                                    },
                                                    required:
                                                        'Please enter a name for the medicine',
                                                },
                                            )}
                                        />
                                        {errors[`medicineName-${index + 1}`]
                                            ?.message && (
                                                <span className="text-red-500 font-bold text-xs uppercase">
                                                    {String(
                                                        errors[
                                                            `medicineName-${index + 1}`
                                                        ]?.message,
                                                    )}
                                                </span>
                                            )}
                                    </div>
                                    <div className="flex flex-col items-center justify-between gap-y-2 w-lg h-20">
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            id={`medicinePrice-${index + 1}`}
                                            defaultValue={1}
                                            className="form_input"
                                            required
                                            {...register(
                                                `medicinePrice-${index + 1}`,
                                                {
                                                    valueAsNumber: true,
                                                    required:
                                                        'Please enter price for the medicine',
                                                    min: {
                                                        value: 1,
                                                        message:
                                                            'Price should be greater than 0',
                                                    },
                                                },
                                            )}
                                        />
                                        {errors?.[`medicineName-${index + 1}`]
                                            ?.message && (
                                                <span className="text-red-500 font-bold text-xs uppercase">
                                                    {String(
                                                        errors?.[
                                                            `medicinePrice-${index + 1}`
                                                        ]?.message,
                                                    )}
                                                </span>
                                            )}
                                    </div>
                                    <div className="flex flex-col items-center justify-between gap-y-2 w-lg h-20">
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            id={`quantityPerPack-${index + 1}`}
                                            defaultValue={1}
                                            className="form_input"
                                            required
                                            {...register(
                                                `quantityPerPack-${index + 1}`,
                                                {
                                                    valueAsNumber: true,
                                                    required:
                                                        'Please enter quantity per pack',
                                                    min: {
                                                        value: 1,
                                                        message:
                                                            'Value should be greater than 0',
                                                    },
                                                },
                                            )}
                                        />
                                        {errors?.[
                                            `quantityPerPack-${index + 1}`
                                        ]?.message && (
                                                <span className="text-red-500 font-bold text-xs uppercase">
                                                    {String(
                                                        errors?.[
                                                            `quantityPerPack-${index + 1}`
                                                        ]?.message,
                                                    )}
                                                </span>
                                            )}
                                    </div>
                                    <div className="flex flex-col items-center justify-between gap-y-2 w-lg h-20">
                                        <input
                                            autoComplete="off"
                                            type="text"
                                            id={`quantityPerDose-${index + 1}`}
                                            defaultValue={1}
                                            className="form_input mr-5"
                                            required
                                            {...register(
                                                `quantityPerDose-${index + 1}`,
                                                {
                                                    valueAsNumber: true,
                                                    required:
                                                        'Please enter dose taken per day',
                                                    min: {
                                                        value: 1,
                                                        message:
                                                            'quantity should be greater than 0',
                                                    },
                                                },
                                            )}
                                        />
                                        {errors?.[
                                            `quantityPerDose-${index + 1}`
                                        ]?.message && (
                                                <span className="text-red-500 font-bold uppercase text-xs">
                                                    {String(
                                                        errors?.[
                                                            `quantityPerDose-${index + 1}`
                                                        ]?.message,
                                                    )}
                                                </span>
                                            )}
                                    </div>
                                </div>
                            );
                        },
                    )}
                    <button
                        type="submit"
                        className="my-3 w-32 h-10 rounded-md text-white cursor-pointer  bg-mb-primary-500"
                    >
                        Add
                    </button>
                </form>
                <div className="absolute right-5">
                    <button
                        className=" mr-5 bg-mb-primary-500 h-12 w-12 rounded-full cursor-pointer text-white shadow-md shadow-mb-secondary-500 transition-transform hover:translate-y-0.5"
                        onClick={() => {
                            setNumOfFields((prev) => prev + 1);
                        }}
                    >
                        +
                    </button>
                    <button
                        className=" mr-5 bg-mb-primary-500 h-12 w-12 rounded-full cursor-pointer text-white shadow-md shadow-mb-secondary-500 transition-transform hover:translate-y-0.5"
                        onClick={() => {
                            setNumOfFields((prev) => {
                                if (prev > 0) return prev - 1;
                                return 0;
                            });
                        }}
                    >
                        -
                    </button>
                </div>
            </div>
        </>
    );
}

export default InfoForm;
