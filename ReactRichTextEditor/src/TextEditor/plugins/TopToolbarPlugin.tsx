interface Props {
    children: JSX.Element | JSX.Element[]
}

export default function TopToolbarPlugin({
    children,
}: Props) {
    return (
        <div className="bg-secondary rounded-top">
            {children}
        </div>
    );
}
