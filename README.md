
# Product Dashboard

This is an assignment of Weecom and contains a small responsive product dashboard according to the requirements




## Setup

To Setup the project use the following instructions:

- Clone the repository
    ```
    https://github.com/JaiSonii/Weecom-frontend.git
    ```
- Navigate to the parent folder
    ```
    eg : cd [parent_folder]
    ```
- Install the Dependencies
    ```
    npm install
    ```
- Run the development Server
    ```
    npm run dev
    ```


## Usage

Once the application is running here the functionalites of the application:

- Filters : Filter according to the categories, search for categories.

- Addition : Demi Addition of the Products via add product dialog

- Edit : Demi edit dialog for editing the Products

- Delete : Demi deletion of the products on delete button


## Libraries

The Libraries used in the project are:

- Tanstack Query
- Tanstack Table (for DataTable as shown in shadcn ui website)
- Shadcn UI
- tailwindcss

## Approach

The Project is setup via React + vite + ts. I have followed a standard and organized approach for the project.

At first i completed the api functions which contribute to the easy part of the project, then setup the React Query Provider for the project.

The layout is structured with a header, sidebar, and main content area, where the sidebar remains visible on desktop and collapses into a mobile-friendly drawer on smaller screens using shadcn’s Sheet component.

For the product table I saw the Shadcn Example for the DataTable and copied the whole DataTable from the Shadcn, then modified for the project usage

CRUD actions (Add, Edit, Delete) are implemented with shadcn’s Dialog and Button components, updating the React Query cache optimistically for an immediate UI response.

## Conclusion

Felt Good making frontend after a while, and looking forward :)