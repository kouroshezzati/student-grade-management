import React, { Component } from 'react';
import ButtonComponent from './Button';
import Input from './Input';
import UserList from './UserList';

interface FieldConfig {
  [field: string]: {
    name: Fields;
    label: string;
  };
}

const FIELDS_CONFIG: FieldConfig = {
  INPUT_STUDENT_NAME: {
    name: 'inputStudentName',
    label: 'Student Name',
  },
  INPUT_GRADE: {
    name: 'inputGrade',
    label: 'Grade',
  },
};

export interface Student {
  name: string;
  grade: number;
}

export const StudentGradeContext = React.createContext<Student[]>([]);
type Fields = 'inputGrade' | 'inputStudentName';

type StudentGradeState = {
  [key in Fields]: string;
} & {
  users: Student[];
  fieldError: Fields | '';
};

class StudentGrade extends Component<{}, StudentGradeState> {
  inputGradeRef: React.RefObject<HTMLInputElement>;
  inputStudentNameRef: React.RefObject<HTMLInputElement>;
  constructor(props: {}) {
    super(props);
    this.state = {
      users: [
        { name: 'Aco', grade: 98 },
        { name: 'Armin', grade: 73 },
        { name: 'Rozhin', grade: 66 },
      ],
      inputGrade: '',
      inputStudentName: '',
      fieldError: '',
    };
    this.inputGradeRef = React.createRef();
    this.inputStudentNameRef = React.createRef();
  }

  handleInputOnChange =
    (stateKey: Fields) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      const { fieldError } = this.state;

      this.setState({
        [stateKey]: value,
      } as Omit<StudentGradeState, 'users' | 'fieldError'>);

      if (fieldError === stateKey && value.length) {
        this.setState({ fieldError: '' });
      }
    };

  areInputsValid = () => {
    const { inputGrade, inputStudentName } = this.state;

    if (!inputGrade) {
      this.inputGradeRef.current?.focus();
      this.setState({ fieldError: 'inputGrade' });
    } else if (!inputStudentName) {
      this.inputStudentNameRef.current?.focus();
      this.setState({ fieldError: 'inputStudentName' });
    }
    return inputGrade && inputStudentName;
  };

  handleButtonClick = () => {
    const { inputGrade, inputStudentName, users } = this.state;
    if (this.areInputsValid()) {
      this.setState({
        users: [
          ...users,
          { name: inputStudentName, grade: parseFloat(inputGrade) },
        ],
        inputStudentName: '',
        inputGrade: '',
      });
    }
  };

  render() {
    const { users, inputStudentName, inputGrade, fieldError } = this.state;
    const { INPUT_GRADE, INPUT_STUDENT_NAME } = FIELDS_CONFIG;
    return (
      <StudentGradeContext.Provider value={users}>
        <UserList title="Users" conditionFilter={() => true} />
        <Input
          label={INPUT_STUDENT_NAME.label}
          ref={this.inputStudentNameRef}
          value={inputStudentName}
          error={fieldError === INPUT_STUDENT_NAME.name}
          onChange={this.handleInputOnChange(INPUT_STUDENT_NAME.name)}
        />
        <Input
          onChange={this.handleInputOnChange(INPUT_GRADE.name)}
          label={INPUT_GRADE.label}
          ref={this.inputGradeRef}
          value={inputGrade}
          error={fieldError === INPUT_GRADE.name}
        />
        <ButtonComponent onClick={this.handleButtonClick}>
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
      </StudentGradeContext.Provider>
    );
  }
}

export default StudentGrade;
