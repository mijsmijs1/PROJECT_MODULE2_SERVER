import en from './data/en'
import vi from './data/vi'
const localesList = [
    {
        code: 'vi',
        data: vi
    },
    {
        code: 'en',
        data: en
    }
];

export default (locales) => {
    let validate = localesList.find(item => item.code == locales);
    if(validate) {
        return validate.data;
    }else {
        return en;
    }
}