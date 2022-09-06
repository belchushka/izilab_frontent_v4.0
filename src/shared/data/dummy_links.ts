import {categories, ICategory} from "./dummy_categories";

console.log(categories);

export interface IDummyLink {
    title: string,
    link: string,
    primary?:boolean,
    blank?: boolean,
    setCategory?: ICategory
}

const links: Array<IDummyLink> = [
    {
        title:"О лаборатории",
        link:"#lab_info",
    },
    {
        title:"Акции",
        link:"#order",
        primary:true,
        setCategory: categories[0]
    },
    {
        title:"Отзывы",
        link:"#comments",
    },
    {
        title:"Услуги и цены",
        link:"#services",
    },
    {
        title:"Вопрос-ответ",
        link:"#faq",
    },
    {
        title:"Контакты",
        link:"#contacts",
    },
]

export default links
