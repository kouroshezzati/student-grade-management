import React, { Component } from 'react';
import ButtonComponent from './Button';
import Input from './Input';
import UserList from './UserList';

interface StudentGradeContextType {
  users: Student[];
  addStudent(student: undefined | Student): any;
}
export interface Student {
  name: string;
  grade: number;
}
export const StudentGradeContext = React.createContext<StudentGradeContextType>(
  {
    users: [],
    addStudent: () => {},
  }
);

interface StudentGradeContextProviderState {
  users: Student[];
}

class StudentGradeContextProvider extends Component<
  {},
  StudentGradeContextProviderState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      users: [
        { name: 'Aco', grade: 98 },
        { name: 'Armin', grade: 73 },
        { name: 'Rozhin', grade: 66 },
      ],
    };
  }
  addStudent = (student: Student) => {
    this.setState({ users: [...this.state.users, student] });
  };
  render() {
    return (
      <StudentGradeContext.Provider
        value={{ users: this.state.users, addStudent: this.addStudent }}
      >
        {this.props.children}
      </StudentGradeContext.Provider>
    );
  }
}

interface StudentGradeState {
  name: string;
  grade: number;
  nameError: boolean;
  gradeError: boolean;
}

export default class StudentGrade extends Component<{}, StudentGradeState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: '',
      grade: 0,
      nameError: false,
      gradeError: false,
    };
  }

  handleNameChange = (name: string) => {
    this.setState({ name, nameError: name.length === 0 });
  };

  handleGradeChange = (grade: number) => {
    this.setState({ grade, gradeError: !grade });
  };

  render() {
    const { name, nameError, grade, gradeError } = this.state;
    return (
      <StudentGradeContextProvider>
        <StudentGradeContext.Consumer>
          {(value) => (
            <>
              <UserList title="Users" conditionFilter={() => true} />
              <Input
                label="Name:"
                onChange={this.handleNameChange}
                value={name}
                error={nameError}
              />
              <Input
                label="Grade:"
                onChange={this.handleGradeChange}
                value={grade}
                error={gradeError}
              />
              <ButtonComponent
                onClick={() => {
                  if (nameError || gradeError) {
                    return;
                  }
                  value.addStudent({ name, grade });
                  this.setState(
                    {
                      name: '',
                      grade: 0,
                      nameError: false,
                      gradeError: false,
                    },
                    () => {
                      console.log('the state is', this.state);
                    }
                  );
                }}
              >
                Save user
              </ButtonComponent>
              <UserList
                title="Users above 90%"
                conditionFilter={(student: Student) => student.grade >= 90}
              />
              <UserList
                title="Users below 70%"
                conditionFilter={(student: Student) => student.grade <= 70}
              />
            </>
          )}
        </StudentGradeContext.Consumer>
      </StudentGradeContextProvider>
    );
  }
}
