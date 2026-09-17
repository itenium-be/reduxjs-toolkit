import { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { increaseYear, increaseYearAsync } from "../more/moreSlice";
import { RootState } from "../store";

const REPO_URL = "https://github.com/itenium-be/reduxjs-toolkit";

class FooterComponent extends Component<PropsFromRedux> {
  render() {
    const syncAction = () => this.props.increaseYear();
    const asyncAction = () => this.props.increaseYearAsync({years: 5});

    return (
      <footer className="bg-light text-center text-lg-start mt-5">
        <div className="container p-4">
          <p className="text-center mb-0">
            © {this.props.year} itenium &nbsp;
            <button type="button" onClick={syncAction} className="btn btn-outline-secondary btn-sm">
              +
            </button>
            <button
              type="button"
              onClick={asyncAction}
              className="btn btn-outline-secondary btn-sm ms-2"
            >
              +5
            </button>
            &nbsp;--&nbsp;&nbsp;
            <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
            &nbsp;--&nbsp;&nbsp;
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" /> GitHub
            </a>
          </p>
        </div>
      </footer>
    )
  }
}

const mapDispatch = {
  increaseYear,
  increaseYearAsync,
};

const mapStateToProps = (state: RootState) => ({
  year: state.more.currentYear,
});

const connector = connect(mapStateToProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const Footer = connector(FooterComponent);
