import { NavigationData } from './types'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import {
    faHospitalUser,
    faHouseChimneyMedical,
    faLaptopMedical,
    faNotesMedical,
    faPills,
    faTruckMedical,
    faUserDoctor,
} from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Menu from '../../components/Menu/Menu'

const navigation: Array<NavigationData> = [
    { text: 'График', icon: faCalendar, path: '/views/schedule' },
    { text: 'Вызов скорой помощи', icon: faTruckMedical, path: '/views/ambulance' },
    { text: 'Журнал вызовов', icon: faHouseChimneyMedical, path: '/schedule' },
    { text: 'Онлайн консультация', icon: faLaptopMedical, path: '/schedule' },
    { text: 'Список ЛПУ', icon: faPills, path: '/schedule' },
    { text: 'Редактирование графика', icon: faNotesMedical, path: '/schedule' },
    { text: 'Информация о враче', icon: faUserDoctor, path: '/schedule' },
    { text: 'Журнал госпитализаций', icon: faHospitalUser, path: '/schedule' },
]

const NavigationList = () => {
    const navigate = useNavigate()

    const onSelectionChange = (data: NavigationData) => {
        navigate(data.path)
    }

    return (
        <Menu
            items={ navigation }
            width={ 240 }
            onSelectionChanged={ value => onSelectionChange(value) }
        />
    )
}

export default NavigationList