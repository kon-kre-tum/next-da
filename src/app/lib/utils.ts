import { differenceInYears } from 'date-fns';

export function caculateAge(birthDate: Date) {
    return differenceInYears(new Date(), birthDate);
}

export function getDefaultImageSrc(){
    return "/images/user.png";
}