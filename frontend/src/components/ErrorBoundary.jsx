import React from 'react';
import FallbackUI from './FallbackUI';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI error={this.state.error?.message} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
