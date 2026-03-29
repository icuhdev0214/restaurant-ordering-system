import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type BasicProps = {
	children?: ReactNode;
	className?: string;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children?: ReactNode;
};

/* Layout components */
export function IonApp({ children }: BasicProps) {
	return <div>{children}</div>;
}

export function IonPage({ children }: BasicProps) {
	return <div>{children}</div>;
}

export function IonHeader({ children }: BasicProps) {
	return <header>{children}</header>;
}

export function IonToolbar({ children }: BasicProps) {
	return <div>{children}</div>;
}

export function IonTitle({ children }: BasicProps) {
	return <h2>{children}</h2>;
}

export function IonContent({ children }: BasicProps) {
	return <div>{children}</div>;
}

/* Card components */
export function IonCard({ children }: BasicProps) {
	return <div>{children}</div>;
}

export function IonCardHeader({ children }: BasicProps) {
	return <div>{children}</div>;
}

export function IonCardTitle({ children }: BasicProps) {
	return <h3>{children}</h3>;
}

export function IonCardSubtitle({ children }: BasicProps) {
	return <p>{children}</p>;
}

export function IonCardContent({ children }: BasicProps) {
	return <div>{children}</div>;
}

/* Buttons */
export function IonButton({ children, ...props }: ButtonProps) {
	return <button {...props}>{children}</button>;
}

/* Text */
export function IonText({ children }: BasicProps) {
	return <span>{children}</span>;
}

/* Badge */
export function IonBadge({ children }: BasicProps) {
	return <span>{children}</span>;
}

/* Icon */
type IconProps = {
	icon?: unknown;
};

export function IonIcon({ icon }: IconProps) {
	return <span>{String(icon ?? '')}</span>;
}
