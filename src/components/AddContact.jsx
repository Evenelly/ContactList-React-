import { useState } from 'react';

function AddContact({ addContact, contacts1}) { 
  const [name, setName] = useState(''); //skapar setstates till de nya namnen
  const [surname, setSurname] = useState('');
  const [bd, setBd] = useState('');

  const handleSubmit = () => { //körs när man submittar
    const newContact = { //skapar nytt objekt för att lägga i kontakt arrayen
      name: name,
      surname: surname,
      bd: bd
    };
    
    addContact(newContact); //använder funktion i app.jsx

    setName(''); //restartar inputen 
    setSurname('');  
    setBd('');
  };

  return (
    <>
    <div className='flex-column'>
        <div className='add-contact'>
            <h3>Add Contact</h3>
            <p>Name:</p>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)} //för att se vad man skriver oc
            />
            <p>Surname:</p>
            <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
            />
            <p>Birthday:</p>
            <input
                type="date"
                value={bd}
                onChange={(e) => setBd(e.target.value)}
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>
    </>
  );
}

export default AddContact;
