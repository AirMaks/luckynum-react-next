import { CSVLink } from "react-csv";
import { Modal } from "shared/ui/Modal/Modal";
import { csvDataHeaders } from "./MortgageCalculator";
import CloseIcon from "shared/assets/icons/navbar/close.svg";
import cn from "classnames";
import { formatPrice } from "helpers/formatPrice";

export const ScheduleModal = (props: any) => {
    const { modalIsOpen, csvData, setModalIsOpen, paymentSchedule, type } = props;

    return (
        <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
            <div className="bg-white p-[20px] rounded shadow">
                <div className="flex justify-between items-center mb-[20px] font-bold">
                    <CSVLink data={csvData} headers={csvDataHeaders} filename={`График платежей по кредиту (${type})`}>
                        <div className="text-[#006af3] cursor-pointer">Скачать график в формате CSV</div>
                    </CSVLink>
                    <CloseIcon width={30} height={30} onClick={() => setModalIsOpen(false)} className={cn("cursor-pointer fill-stone-800")} />
                </div>
                {paymentSchedule.length > 0 && (
                    <div className="border border-black overflow-x-auto">
                        <div className="w-max">
                            <div className="bg-[#b0e5ff] border-b border-b-black flex justify-between font-bold p-[10px] text-center">
                                <div className="w-[200px]">Дата</div>
                                <div className="w-[200px]">Платеж</div>
                                <div className="w-[200px]">Погашено</div>
                                <div className="w-[200px]">Остаток</div>
                                <div className="w-[200px]">Проценты</div>
                            </div>
                            <div className="overflow-x-auto max-h-[calc(100vh-220px)]">
                                {paymentSchedule.map((payment: any, index: number) => (
                                    <div key={index} className="flex py-[5px] text-center border-b border-b-black last:border-0">
                                        <div className="w-[200px]">
                                            <b>{payment.date}</b>
                                        </div>
                                        <div className="w-[200px]">
                                            <b>{formatPrice(payment.payment)}</b>
                                        </div>
                                        <div className="w-[200px]">
                                            <b>{formatPrice(payment.principal)}</b>
                                        </div>
                                        <div className="w-[200px]">{formatPrice(payment.balance)}</div>
                                        <div className="w-[200px]">{formatPrice(payment.interest)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    );
};
