import AddClient from ".";
import { fireEvent, render, screen } from "@testing-library/react";
import { AreaContext } from "common/context/AreaContext";
import { ClientsContext } from "common/context/ClientsContext";
import userEvent from "@testing-library/user-event";


const wrapper = (props) => {
    render(
        <AreaContext.Provider value={{
            areaList: props.areaList
        }}
    >
            <ClientsContext.Provider
                value={{
                    handleClient: props.handleClient,
                    clientsList: props.clientslist 
                }}
            >
                <AddClient/>
            </ClientsContext.Provider>
        </AreaContext.Provider>
    );
};

const mockedAreaList = ['Manly', 'Avalon', 'New Port']
const mockedClientsList = [{name:"Client1",id:"1",area:"Avalon",address:"client address",interval:30,lastVisit:"01/01/2021",visitList:[],notes:""}, {name:"Client2",id:"2",area:"Manly",address:"client address",interval:15,lastVisit:"01/01/2021",visitList:[],notes:""}]

const mockedHandleClient = jest.fn()

describe('AddClient Form', () => {
    it('Function handleClient is Called with right args', async () => {
        wrapper({areaList: mockedAreaList, clientsList: mockedClientsList, handleClient: mockedHandleClient })
        const areaSelector = screen.getByLabelText('Select Area *')
        const nameField = screen.getByLabelText('Name *')
        const addressField = screen.getByLabelText('Address *')
        const frequencyField = screen.getByLabelText('Frequency * *')
        const dateField = screen.getByLabelText('Last/First Visit *')
        
        userEvent.click(areaSelector)
        const option = await screen.findByText('Avalon')
        userEvent.click(option)        
        userEvent.type(nameField, 'Arthur')
        userEvent.type(addressField, 'test Address')
        userEvent.type(dateField, '01/01/2021')
        console.log(areaSelector.nextSibling)
        

        expect(areaSelector).toHaveTextContent('teste')


    })
})