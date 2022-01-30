import "./singleCompanyProps.css";

interface SingleCompanyPropsProps {
    id:number,
    name:string,
    email:string
}

function SingleCompanyProps(props: SingleCompanyPropsProps): JSX.Element {
    return (
        <div className="singleCompanyProps Box">
			<h1>Company Info</h1><hr/>
            id: {props.id} <br />
            name: {props.name} <br />
            email: {props.email} <br />
        </div>
    );
}

export default SingleCompanyProps;
