import { NavigationData } from './types'
import Menu from '../../components/Menu/Menu'

const navigation: Array<NavigationData> = [
    { text: 'График', icon: 'schedule', path: '/schedule' },
    { text: 'Вызов скорой помощи', icon: 'ambulanceBold', path: '/ambulance' },
    { text: 'Журнал вызовов', icon: 'callJournalBold', path: '/journal' },
    { text: 'Онлайн консультация', icon: 'onlineConsultation', path: '/online' },
    { text: 'Список ЛПУ', icon: 'lpu_2', path: '/lpu' },
    { text: 'Редактирование графика', icon: 'editBold', path: '/editSchedule' },
    { text: 'Информация о враче', icon: 'medic', path: '/medicInfo' },
    { text: 'Журнал госпитализаций', icon: 'hospitalization', path: '/hospitalization' },
]

const NavigationMenu = () => {
    return (
        <>
            <Menu
                items={ navigation }
            />
        </>
    )
}

export default NavigationMenu