"use strict";
var core;
(function (core) {
    class Contact {
        m_fullName;
        m_contactNumber;
        m_emailAddress;
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_emailAddress = emailAddress;
        }
        get FullName() {
            return this.m_fullName;
        }
        get ContactNumber() {
            return this.m_contactNumber;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        set FullName(fullName) {
            this.m_fullName = fullName;
        }
        set ContactNumber(contactNumber) {
            this.m_contactNumber = contactNumber;
        }
        set EmailAddress(emailAddress) {
            this.m_emailAddress = emailAddress;
        }
        toString() {
            return `Full Name: ${this.m_fullName}\n Contact Number: 
                    ${this.m_contactNumber}\n Email Address: ${this.m_emailAddress}`;
        }
        serialize() {
            if (this.m_fullName != "" && this.m_contactNumber != "" && this.m_emailAddress != "") {
                return `${this.m_fullName}, ${this.m_contactNumber}, ${this.m_emailAddress}`;
            }
            console.error("One or more of the properties of the Contact object are missing or invalid");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.m_fullName = propertyArray[0];
            this.m_contactNumber = propertyArray[1];
            this.m_emailAddress = propertyArray[2];
        }
    }
})(core || (core = {}));
//# sourceMappingURL=contact.js.map