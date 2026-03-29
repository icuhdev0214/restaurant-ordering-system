import React from 'react';

type BasicProps = {
	children?: React.ReactNode;
	className?: string;
	[key: string]: unknown;
};

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
	return <div>{children}</div>;
}

export function IonContent({ children }: BasicProps) {
	return <div>{children}</div>;
}

export function IonCard({ children }: BasicProps) {
	return <div>{children}</div>;
}

export function IonCardHeader({ children }: BasicProps) {
	return <div>{children}</div>;
}

export function IonCardTitle({ children }: BasicProps) {
	return <h3>{children}</h3>;
}

export function IonCardContent({ children }: BasicProps) {
	return <div>{children}</div>;
}

export function IonText({ children }: BasicProps) {
	return <div>{children}</div>;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children?: React.ReactNode;
};

export function IonButton({ children, ...props }: ButtonProps) {
	return <button {...props}>{children}</button>;
}

type ModalProps = {
	isOpen?: boolean;
	children?: React.ReactNode;
};

export function IonModal({ isOpen, children }: ModalProps) {
	if (!isOpen) return null;
	return <div>{children}</div>;
}
