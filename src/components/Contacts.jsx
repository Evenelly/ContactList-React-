function Contacts({contacts}){
    return(
        <>

        <div id="contacts"  >
            {contacts.map((contact, index) => {
                return (
                        <div key={index} className="contact-id"> 
                            <p>{contact.name} {contact.surname}</p>
                            <p>Birthday: {contact.bd}</p>
                        </div> 
                    )
            })}
        </div>
        </>
    )
}

export default Contacts;