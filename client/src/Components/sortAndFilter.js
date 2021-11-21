const BY_NAME = "BY_NAME"
const BY_FAMILYNAME = "BY_FAMILYNAME"
const BY_DATE = "BY_DATE"
const BY_SEARCHES_NUMBER = "BY_SEARCHES_NUMBER"


export const sortingOptions = [
    {
        value: BY_NAME,
        label: "name"
    },
    {
        value: BY_FAMILYNAME,
        label: "familyname"
    },    
    {
        value: BY_DATE,
        label: "date"
    },
    {
        value: BY_SEARCHES_NUMBER,
        label: "searches"
    }, 
]

const containsString = (stringToTest, stringToSearch) => {
    if (!stringToTest) {
        return false
    }
    let stringToTestLC = stringToTest.toLowerCase()
    let stringToSearchLC = stringToSearch.toLowerCase()
    return stringToTestLC.includes(stringToSearchLC)
}


const contactContainesString = (contact, searString) => {
    return containsString(contact.name, searString) ||
            containsString(contact.familyName, searString) ||
            containsString(contact.companyName, searString) ||
            containsString(contact.position, searString) ||
            containsString(contact.primaryNumber, searString) ||
            containsString(contact.secondaryNumber, searString) ||
            containsString(contact.primaryEmail, searString) ||
            containsString(contact.secondaryEmail, searString)  
}


export const sortAndFilter = (contacts, searchString, sortString) => {
    //console.log(contacts, searchString, sortString);
    let filteredContacts = [...contacts]
    
    filteredContacts = filteredContacts
        .filter(contact => contactContainesString(contact, searchString))
    
    let sortedContacts = [...filteredContacts]
    
    sortedContacts = sortedContacts.sort((a,b)=>{
        switch(sortString) {
            case BY_NAME: 
                    let nameA = a.name.toUpperCase()
                    let nameB = b.name.toUpperCase()
                    if (nameA < nameB) {
                        return -1
                    }
                    if (nameA > nameB) {
                        return 1
                    }
                    return 0    

            case BY_FAMILYNAME:
                    let familynameA = a.familyName.toUpperCase()
                    let familynameB = b.familyName.toUpperCase()
                    if (familynameA < familynameB) {
                        return -1
                    }
                    if (familynameA > familynameB) {
                        return 1
                    }
                    return 0                   
    
            case BY_SEARCHES_NUMBER:
                    let searchesNumberA = a.searchesCount
                    let searchesNumberB = b.searchesCount
                    return searchesNumberB - searchesNumberA

            case BY_DATE:
                    let createdA = a.created
                    let createdB = b.created
                    if (createdB < createdA) {
                        return -1
                    }
                    if (createdA > createdB) {
                        return 1
                    }
                    return 0    
            default:
                throw new Error('Wrong sorting selector value!')    
        }     
    })


    return sortedContacts
}