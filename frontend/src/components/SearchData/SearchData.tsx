import React, { ChangeEvent } from "react";
import UserResponse from "../../model/interfaces/UserResponse";
import UserService from "../../services/UserService/UserService";
// import { useState } from "react";

interface SearchDataProps {}

interface SearchDataState extends UserResponse {}

class SearchData extends React.Component<SearchDataProps, SearchDataState> {
  constructor(props: SearchDataProps) {
    super(props);
    this.state = {
      ok: false,
      message: "",
      data: [],
    };
  }

  
  componentDidMount(): void {
    this.getAllUsers();
  }
  
  private getAllUsers(): void {
    const data: Promise<UserResponse> = UserService.getAllUsers();
    data.then((response: UserResponse) => {
      this.setState(() => ({
        ok: response.ok,
        message: response.message,
        data: response.data,
      }));
    });
  }

  search = (event: ChangeEvent<HTMLInputElement> ) => {
    const teste = this.state.data.find(usuario => usuario.userName.includes( event.target.value));
    console.log(teste);
  }

  render() {
    
    return (
      <div>
        <input
          className="form-input"
          id="input-table"
          placeholder="Ache um Usuario"
          // value={search}
          onChange={() => this.search}
        />
      </div>
    );
  }
}

export default SearchData;








