import { NavigationData } from './types'
import { ReactComponent as schedule } from '../../assets/icons/schedule.svg'
import { ReactComponent as ambulance } from '../../assets/icons/ambulanceBold.svg'
import { ReactComponent as callJournal } from '../../assets/icons/callJournalBold.svg'
import { ReactComponent as onlineConsultation } from '../../assets/icons/onlineConsultation.svg'
import { ReactComponent as lpu } from '../../assets/icons/lpu_2.svg'
import { ReactComponent as editSchedule } from '../../assets/icons/editBold.svg'
import { ReactComponent as medicInfo } from '../../assets/icons/medic.svg'
import { ReactComponent as hospitalization } from '../../assets/icons/hospitalization.svg'

import { useNavigate } from 'react-router-dom'
import Menu from '../../components/Menu/Menu'

const navigation: Array<NavigationData> = [
    { text: 'График', icon: schedule, path: '/views/schedule' },
    { text: 'Вызов скорой помощи', icon: ambulance, path: '/views/ambulance' },
    { text: 'Журнал вызовов', icon: callJournal, path: '/schedule' },
    { text: 'Онлайн консультация', icon: onlineConsultation, path: '/schedule' },
    { text: 'Список ЛПУ', icon: lpu, path: '/schedule' },
    { text: 'Редактирование графика', icon: editSchedule, path: '/schedule' },
    { text: 'Информация о враче', icon: medicInfo, path: '/schedule' },
    { text: 'Журнал госпитализаций', icon: hospitalization, path: '/schedule' },
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