import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'

export default () =>
  <>
    <h1 className="h2">Psych-DS validator prototype</h1>
    <Nav className="justify-content-center">
      <NavItem>
        <NavLink href="https://psych-ds.github.io/">
          Psych-DS project
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://docs.google.com/document/d/1u8o5jnWk0Iqp_J06PTu5NjBfVsdoPbBhstht6W0fFp0/edit">
          Specification
        </NavLink>
      </NavItem>
    </Nav>
    <p
      className="mx-md-auto"
      style={{
        maxWidth: '550px'
      }}
    >
      Even though this validator runs in the browser, <strong>your data is does not leave your computer</strong>. No information is shared with any third party.
    </p>
  </>
