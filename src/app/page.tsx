import { title, description, keywords } from "./seo";
import type { Metadata } from "next";
import { metaData } from "./metadata";
import Link from "next/link";
import ImageOg from "../../public/og-main-page.jpg";

export const metadata: Metadata = {
    ...metaData({ title, description, keywords, img: ImageOg })
};

function addProductJsonLd() {
    return {
        __html: `{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Сервис онлайн-калькуляторов и генераторов",
          "url": "https://lucky-num.ru",
          "description": "Рассчитайте кредит, выберите идеальные параметры для автомобиля, выполните сложные математические вычисления или получите случайные числа, слова, уникальные пароли и много чего другого всего за несколько секунд.",
          "applicationCategory": "Utility",
          "operatingSystem": "All"
        }`
    };
}

export default function Home() {
    return (
        <main className="px-[10px] ms-auto me-auto max-w-[1000px]" role="main">
            <div className="mt-[20px]">
                <section aria-labelledby="calculators-heading" className="p-[20px] max-sm:p-[10px] bg-[#f5f5f7] shadow mb-[20px]">
                    <h2 id="calculators-heading" className="font-medium text-[22px] mb-[10px] pl-[5px]">
                        Калькуляторы
                    </h2>
                    <nav aria-label="Список калькуляторов">
                        <ul className="flex flex-wrap gap-[10px]">
                            <li className="max-md:w-[calc(50%-5px)] max-sm:w-[100%]">
                                <Link
                                    href="/credit-calculator"
                                    className="bg-[#f5f5f7] truncate leading-none shadow max-sm:text-[14px] px-[15px] py-[8px] rounded inline-block text-black font-medium w-full"
                                    aria-label="Кредитный калькулятор">
                                    Кредитный калькулятор
                                </Link>
                            </li>
                            <li className="max-md:w-[calc(50%-5px)] max-sm:w-[100%]">
                                <Link
                                    href="/mortgage-calculator"
                                    className="bg-[#f5f5f7] truncate leading-none shadow max-sm:text-[14px] px-[15px] py-[8px] rounded inline-block text-black font-medium w-full"
                                    aria-label="Калькулятор ипотеки">
                                    Калькулятор ипотеки
                                </Link>
                            </li>
                            <li className="max-md:w-[calc(50%-5px)] max-sm:w-[100%]">
                                <Link
                                    href="/percent-calculator"
                                    className="bg-[#f5f5f7] truncate leading-none shadow max-sm:text-[14px] px-[15px] py-[8px] rounded inline-block text-black font-medium w-full"
                                    aria-label="Калькулятор процентов">
                                    Калькулятор процентов
                                </Link>
                            </li>
                            <li className="max-md:w-[calc(50%-5px)] max-sm:w-[100%]">
                                <Link
                                    href="/kalkulyator-shin"
                                    className="bg-[#f5f5f7] truncate leading-none shadow max-sm:text-[14px] px-[15px] py-[8px] rounded inline-block text-black font-medium w-full"
                                    aria-label="Калькулятор шин и дисков">
                                    Калькулятор шин и дисков
                                </Link>
                            </li>
                            <li className="max-md:w-[calc(50%-5px)] max-sm:w-[100%]">
                                <Link
                                    href="/kalkulyator-kaloriy"
                                    className="bg-[#f5f5f7] truncate leading-none shadow max-sm:text-[14px] px-[15px] py-[8px] rounded inline-block text-black font-medium w-full"
                                    aria-label="Калькулятор калорий">
                                    Калькулятор калорий
                                </Link>
                            </li>
                            <li className="max-md:w-[calc(50%-5px)] max-sm:w-[100%]">
                                <Link
                                    href="/shirina-shtor"
                                    className="bg-[#f5f5f7] truncate leading-none shadow max-sm:text-[14px] px-[15px] py-[8px] rounded inline-block text-black font-medium w-full"
                                    aria-label="Калькулятор расчета штор на окно">
                                    Калькулятор расчета штор на окно
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </section>
                <section aria-labelledby="generators-heading" className="p-[20px] max-sm:p-[10px] bg-[#f5f5f7] shadow">
                    <h2 id="generators-heading" className="font-medium text-[22px] mb-[10px] pl-[5px]">
                        Генераторы
                    </h2>
                    <nav aria-label="Список генераторов">
                        <ul className="flex flex-wrap gap-[10px]">
                            <li className="max-md:w-[calc(50%-5px)] max-sm:w-[100%]">
                                <Link
                                    href="/generator-sluchainykh-chisel"
                                    className="bg-[#f5f5f7] truncate leading-none shadow max-sm:text-[14px] px-[15px] py-[8px] rounded inline-block text-black font-medium w-full"
                                    aria-label="Генератор случайных чисел">
                                    Генератор случайных чисел
                                </Link>
                            </li>
                            <li className="max-md:w-[calc(50%-5px)] max-sm:w-[100%]">
                                <Link
                                    href="/generator-sluchainykh-slov"
                                    className="bg-[#f5f5f7] truncate leading-none shadow max-sm:text-[14px] px-[15px] py-[8px] rounded inline-block text-black font-medium w-full"
                                    aria-label="Генератор случайных слов">
                                    Генератор случайных слов
                                </Link>
                            </li>
                            <li className="max-md:w-[calc(50%-5px)] max-sm:w-[100%]">
                                <Link
                                    href="/generator-parolei"
                                    className="bg-[#f5f5f7] truncate leading-none shadow max-sm:text-[14px] px-[15px] py-[8px] rounded inline-block text-black font-medium w-full"
                                    aria-label="Генератор паролей">
                                    Генератор паролей
                                </Link>
                            </li>
                            <li className="max-md:w-[calc(50%-5px)] max-sm:w-[100%]">
                                <Link
                                    href="/generator-da-net"
                                    className="bg-[#f5f5f7] truncate leading-none shadow max-sm:text-[14px] px-[15px] py-[8px] rounded inline-block text-black font-medium w-full"
                                    aria-label="Генератор ответов Да или Нет">
                                    Генератор ответов Да или Нет
                                </Link>
                            </li>
                            <li className="max-md:w-[calc(50%-5px)] max-sm:w-[100%]">
                                <Link
                                    href="/qr-code-generator"
                                    className="bg-[#f5f5f7] truncate leading-none shadow max-sm:text-[14px] px-[15px] py-[8px] rounded inline-block text-black font-medium w-full"
                                    aria-label="QR код генератор">
                                    QR код генератор
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </section>
            </div>
            <article className="bg-[#f5f5f7] shadow mt-[20px] max-sm:mt-[10px] p-[20px] max-sm:px-[10px]">
                <h1 className="text-[24px] mb-[20px] font-medium max-sm:text-[17px]">Сервис онлайн калькуляторов и инструментов для расчета</h1>
                <p className="mb-[20px] text-[20px] max-sm:text-[16px]">
                    <span className="font-bold">LUCKY-NUM.RU</span> — это сайт-приложение с каталогом калькуляторов для точных и быстрых расчетов, а
                    также различных генераторов.
                </p>
                <section aria-labelledby="calculator-types-heading">
                    <h2 id="calculator-types-heading" className="mb-[5px] text-[18px] max-sm:text-[16px]">
                        Виды калькуляторов:
                    </h2>
                    <ul className="ps-[20px] mb-[20px]">
                        <li className="list-disc mb-[5px]">Финансовые калькуляторы — расчет ипотеки и различных видов кредита</li>
                        <li className="list-disc mb-[5px]">Автомобильные калькуляторы — расчет размеров шин и дисков</li>
                        <li className="list-disc mb-[5px]">Математические решения — для студентов и просто тех, кто любит точные цифры.</li>
                        <li className="list-disc mb-[5px]">И много других калькуляторов</li>
                    </ul>
                </section>
                <section aria-labelledby="generator-types-heading">
                    <h2 id="generator-types-heading" className="mb-[5px] text-[18px] max-sm:text-[16px]">
                        Генераторы и рандомайзеры:
                    </h2>
                    <ul className="ps-[20px]">
                        <li className="list-disc mb-[5px]">Генератор случайных чисел</li>
                        <li className="list-disc mb-[5px]">Генератор случайных слов</li>
                        <li className="list-disc mb-[5px]">Генератор паролей</li>
                        <li className="list-disc mb-[5px]">Генератор ответов Да/Нет</li>
                        <li className="list-disc mb-[5px]">QR-код генератор</li>
                    </ul>
                </section>
            </article>
        </main>
    );
}
