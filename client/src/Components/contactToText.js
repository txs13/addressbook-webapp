const contactToText = (contact) => {
    let contactStr = ""

    contactStr += `Name: ${contact.name}\n`

    if(contact.familyName !== "") {contactStr += `Familyname: ${contact.familyName}\n`}
    
    if(contact.companyName !== "") {contactStr += `Company: ${contact.companyName}\n`}
    
    if(contact.position !== "") {contactStr += `Position: ${contact.position}\n`}
    
    contactStr += `Primary phone number: ${contact.primaryNumber}\n`
    
    if(contact.secondaryNumber !== "") {contactStr += `Secondary phone number: ${contact.secondaryNumber}\n`}
    
    contactStr += `Primary email: ${contact.primaryEmail}\n`
    
    if(contact.secondaryEmail !== "") {contactStr += `Secondary email: ${contact.secondaryEmail}\n`}
    
    if(contact.primaryAddress !== "") {contactStr += `Primary Address: ${contact.primaryAddress}\n`}
    
    if(contact.secondaryAddress !== "") {contactStr += `Secondary Address: ${contact.secondaryAddress}`}

    return contactStr
}

export default contactToText