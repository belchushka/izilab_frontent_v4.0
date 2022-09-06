import bombImage from "@assets/icons/bomb.png";
import fireImage from "@assets/icons/fire.png";
import microscopeImage from "@assets/icons/microscope.png";
import diamondImage from "@assets/icons/diamond.png";
import bloodImage from "@assets/icons/blood.png";
import lemonImage from "@assets/icons/lemon.png";
import butterflyImage from "@assets/icons/butterfly.png";
import pillImage from "@assets/icons/pill.png";
import bearImage from "@assets/icons/bear.png";
import dnaImage from "@assets/icons/dna.png";
import allergyImage from "@assets/icons/allergy.png";
import heartImage from "@assets/icons/heart.png";
import pregnancyImage from "@assets/icons/pregnaancy.png";
import onyImage from "@assets/icons/onicomarkers.png";
import sportImage from "@assets/icons/sport.png";
import covidImage from "@assets/icons/covid.png";
import otherImage from "@assets/icons/category_doctor.png";


export interface ICategory {
    id: number
    icon: string,
    text: string,
    category_name: string
}

export const categories: Array<ICategory> =[
    {
        id: 0,
        icon: bombImage,
        text: "Акции",
        category_name: "Акции",
    },
    {
        id: 1,
        icon: fireImage,
        text: "Популярное",
        category_name: "Популярное",
    },
    {
        id: 2,
        icon: microscopeImage,
        text: "Чекапы",
        category_name: "Чекапы",
    },
    {
        id: 3,
        icon: diamondImage,
        text: "Комплексы",
        category_name: "Комплексы",
    },
    {
        id: 4,
        icon: bloodImage,
        text: "Биохимия",
        category_name: "Биохимия",
    },
    {
        id: 5,
        icon: lemonImage,
        text: "Витамины",
        category_name: "Витамины",
    },
    {
        id: 6,
        icon: butterflyImage,
        text: "Гормоны",
        category_name: "Гормоны",
    },
    {
        id: 7,
        icon: pillImage,
        text: "Микроэлементы",
        category_name: "Микроэлементы",
    },
    {
        id: 8,
        icon: bearImage,
        text: "Детям",
        category_name: "Детям",
    },

    {
        id: 11,
        icon: heartImage,
        text: "ИППП",
        category_name: "ИППП",
    },
    {
        id: 13,
        icon: onyImage,
        text: "Онкомаркеры",
        category_name: "Онкомаркеры",
    },
    {
        id: 15,
        icon: otherImage,
        text: "Другие",
        category_name: "Другие",
    },
]