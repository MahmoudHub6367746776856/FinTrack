import React from 'react';

type WebGLBackgroundBoundaryProps = {
  children: React.ReactNode;
};

type WebGLBackgroundBoundaryState = {
  hasError: boolean;
  checked: boolean;
};

function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl' as any);

    return !!(window.WebGLRenderingContext && gl);
  } catch {
    return false;
  }
}

export class WebGLBackgroundBoundary extends React.Component<
  WebGLBackgroundBoundaryProps,
  WebGLBackgroundBoundaryState
> {
  state: WebGLBackgroundBoundaryState = {
    hasError: false,
    checked: false,
  };

  componentDidMount(): void {
    const supported = isWebGLAvailable();
    this.setState({ hasError: !supported, checked: true });
  }

  componentDidCatch(): void {
    this.setState({ hasError: true, checked: true });
  }

  render() {
    const { hasError, checked } = this.state;

    // Avoid rendering children until we've determined WebGL support
    if (!checked) {
      return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-background" />
      );
    }

    if (hasError) {
      // Graceful non-WebGL fallback background
      return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-background" />
      );
    }

    return this.props.children;
  }
}

