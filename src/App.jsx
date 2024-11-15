import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Contacts from './components/Contacts'
import AddContact from './components/AddContact'
import Sort from './components/sort'

function App() {

  const [contacts, setContacts] = useState([
    {
      name: "Bindra",
      surname: "Lar",
      bd: "2002-12-12"
    },
    {
      name: "Eindra",
      surname: "Alr",
      bd: "2001-11-16"
    },
    {
      name: "Cindra",
      surname: "Tar",
      bd: "2000-10-12"
    }
  ])
  const [sort, setSort] = useState(["Sort"])

  const addContact = (newContact) => {
    setContacts(contacts => {
      const newContacts = [...contacts, newContact];
      return sortContacts(sort, newContacts);
    });

  };

  const selectedSort = (newSelected) => {
    setSort(newSelected)
    sortContacts(newSelected)
  }

  function daysTilBD(birthdayString){ //räknar ut dagarna kvar till ett specifikt datum (birthday)

    const birthday = new Date(birthdayString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentYear = today.getFullYear();
    let nextBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());
    nextBirthday.setHours(0, 0, 0, 0);

    if (nextBirthday < today) {
        nextBirthday.setFullYear(currentYear + 1);
    }

    const timeDifference = nextBirthday - today;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
  }

  
  function sortContacts(sortType, contactsToSort = contacts){ //contactsToSort = contact för att få bort chansen att den kan vara undefined
  
    if (sortType === "A-Z") {
      contactsToSort.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if(sortType === "Age"){ //tagit från min gamla
      
      const date = new Date();

      let sorted = false;

      while(!sorted){
        sorted = true;

        for (let i = 0; i < contactsToSort.length - 1; i++){

          const contact1 = new Date(contactsToSort[i].bd)
          const contact2 = new Date(contactsToSort[i + 1].bd)

          const difference1 = date.getFullYear() - contact1.getFullYear() + "" + (date.getMonth() - contact1.getMonth()) + "" + (date.getDate() - contact1.getDate())
          const difference2 = date.getFullYear() - contact2.getFullYear() + "" + (date.getMonth() - contact2.getMonth()) + "" + (date.getDate() - contact2.getDate())
          
          if(difference1 < difference2){
            [contactsToSort[i], contactsToSort[i + 1]] = [contactsToSort[i + 1], contactsToSort[i]]
            
            sorted = false;
          }
        }
      }

    }else if(sortType === "Birthday"){ //tagit från min gamla
      let sorted = false;

      while (!sorted) {
        sorted = true;

        for (let i = 0; i < contactsToSort.length - 1; i++) {
          const contact1 = new Date(contactsToSort[i].bd);
          const contact2 = new Date(contactsToSort[i + 1].bd);

          const daysUntil1 = daysTilBD(contact1);
          const daysUntil2 = daysTilBD(contact2);

          if (daysUntil1 > daysUntil2) {
            [contactsToSort[i], contactsToSort[i + 1]] = [contactsToSort[i + 1], contactsToSort[i]];
            sorted = false;
          }
        }
      }
    }
    
    return contactsToSort;
  }


  return (
    <>  
      <h2>Contacts manager</h2>
      <div id='main'>
      <AddContact addContact={addContact}/>
        <div id="contacts-div">
          <div id="contacts-main">

            <div id='top-contacts'>
              <p>Contacts</p>
              <Sort selectedSort={selectedSort} sortAlternative={sort}/>
            </div>
            <Contacts contacts={contacts}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
