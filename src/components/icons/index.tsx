import dynamic from 'next/dynamic'
import { FC, SVGAttributes } from 'react'

interface Props extends SVGAttributes<SVGElement> {
    ext?: 'svg';
    icon: string;
}

export const Icon: FC<Props> = ({ icon, ext = 'svg', ...props }) => {
    const Icon = dynamic(() => import(`./${ ext }/${ icon }.svg`))
    return <Icon { ...props } />
}