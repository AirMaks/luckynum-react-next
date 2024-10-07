import { title, description, keywords } from "./seo";
import type { Metadata } from "next";
import { metaData } from "./metadata";
import Link from "next/link";
import ImageOg from "../../public/og-main-page.jpg";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

export default function Home() {
    return (
        <div className="px-[10px] ms-auto me-auto max-w-[1000px]">
            <ul className="flex gap-[10px] flex-wrap mt-[20px]">
                <li>
                    <Link
                        href="/credit-calculator"
                        className="bg-[#f7f7f7] shadow max-sm:text-[14px] px-[15px] py-[5px] rounded inline-block text-black font-medium">
                        Кредитный калькулятор
                    </Link>
                </li>
                <li>
                    <Link
                        href="/mortgage-calculator"
                        className="bg-[#f7f7f7] shadow max-sm:text-[14px] px-[15px] py-[5px] rounded inline-block text-black font-medium">
                        Калькулятор ипотеки
                    </Link>
                </li>
                <li>
                    <Link
                        href="/percent-calculator"
                        className="bg-[#f7f7f7] shadow max-sm:text-[14px] px-[15px] py-[5px] rounded inline-block text-black font-medium">
                        Калькулятор процентов
                    </Link>
                </li>
                <li>
                    <Link
                        href="/generator-sluchainykh-chisel"
                        className="bg-[#f7f7f7] shadow max-sm:text-[14px] px-[15px] py-[5px] rounded inline-block text-black font-medium">
                        Генератор случайных чисел
                    </Link>
                </li>
                <li>
                    <Link
                        href="/generator-sluchainykh-slov"
                        className="bg-[#f7f7f7] shadow max-sm:text-[14px] px-[15px] py-[5px] rounded inline-block text-black font-medium">
                        Генератор случайных слов
                    </Link>
                </li>
                <li>
                    <Link
                        href="/shirina-shtor"
                        className="bg-[#f7f7f7] shadow max-sm:text-[14px] px-[15px] py-[5px] rounded inline-block text-black font-medium">
                        Калькулятор расчета штор на окно
                    </Link>
                </li>
            </ul>
            <div className="bg-[#f7f7f7] shadow mt-[20px] max-sm:mt-[10px] p-[20px] rounded max-sm:px-[10px]">
                <h1 className="text-[24px] mb-[20px] font-medium max-sm:text-[17px]">Сервис онлайн калькуляторов и инструментов для расчета</h1>
                <p className=" mb-[20px] text-[20px] max-sm:text-[16px]">
                    <span className="font-bold">LUCKY-NUM.RU</span> — это сайт-приложение с каталогом калькуляторов для точных и быстрых расчетов, а
                    также различных генераторов.
                </p>
                <div className="mb-[5px] text-[18px] max-sm:text-[16px]">Виды калькуляторов:</div>
                <ul className="ps-[20px] mb-[20px]">
                    <li className="list-disc mb-[5px]">Финансовые калькуляторы — расчет ипотеки и различных видов кредита</li>
                    <li className="list-disc mb-[5px]">Автомобильные калькуляторы — расчет размеров шин и дисков</li>
                    <li className="list-disc mb-[5px]">Математические решения — для студентов и просто тех, кто любит точные цифры.</li>
                    <li className="list-disc mb-[5px]">И много других калькуляторов</li>
                </ul>
                <div className="mb-[5px] text-[18px] max-sm:text-[16px]">Генераторы и рандомайзеры:</div>
                <ul className="ps-[20px]">
                    <li className="list-disc mb-[5px]">Генератор случайных чисел</li>
                    <li className="list-disc mb-[5px]">Генератор случайных слов</li>
                    <li className="list-disc mb-[5px]">Генератор уникальных паролей</li>
                </ul>
            </div>
        </div>
    );
}
