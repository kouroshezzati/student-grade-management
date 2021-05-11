import React, { Component } from 'react';
import { StudentGradeContext, Student } from './StudentGrade';
interface UserListProps {
  title: string;
  conditionFilter(student: undefined | Student): boolean;
}
export default class UserList extends Component<UserListProps, {}> {
  render() {
    const { title, conditionFilter } = this.props;
    return (
      <StudentGradeContext.Consumer>
        {(value) => (
          <>
            <h1>{title}</h1>
            <ul>
              {value.users.filter(conditionFilter).map((user) => (
                <li key={user.name + '-' + Math.floor(Math.random() * 1000)}>
                  {user.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </StudentGradeContext.Consumer>
    );
  }
}
