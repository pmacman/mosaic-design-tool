import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/swiper-bundle.css";

export function init() {
    Swiper.use([Navigation, Pagination]);
    const swiper = new Swiper(".swiper-container", {
        autoHeight: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        noSwipingSelector: ".no-swipe",
        pagination: {
            el: ".swiper-pagination"
        }
    });
}