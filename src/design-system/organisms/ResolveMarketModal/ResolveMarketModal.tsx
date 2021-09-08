import * as React from 'react';
import * as Yup from 'yup';
import styled from '@emotion/styled';
import { Backdrop, Box, Modal, Fade, Grid, useTheme } from '@material-ui/core';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';
import { TokenType } from '../../../interfaces';
import { CustomButton } from '../../atoms/Button';
import {
  FormikToggleButton,
  ToggleButtonItems,
} from '../../molecules/FormikToggleButton/FormikToggleButton';

interface StyledFormWrapperProps {
  backgroundColor?: string;
}

export interface ResolveMarketForm {
  outcome: TokenType;
}

export interface ResolveMarketModalProps {
  open?: boolean;
  handleClose?: () => void | Promise<void>;
  handleSubmit: (
    values: ResolveMarketForm,
    helpers: FormikHelpers<ResolveMarketForm>,
  ) => void | Promise<void>;
}

const StyledFormWrapper = styled(Box)<StyledFormWrapperProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65%;
  padding: 2rem;
  box-shadow: 24;
  background-color: ${(props) => props.backgroundColor};
`;

const defaultOpen = false;

export const ResolveMarketModal: React.FC<ResolveMarketModalProps> = ({
  open = defaultOpen,
  handleClose,
  handleSubmit,
}) => {
  const { t } = useTranslation(['common', 'market']);
  const theme = useTheme();

  const outcomeItems: ToggleButtonItems[] = [
    {
      label: TokenType.yes,
      value: TokenType.yes,
    },
    {
      label: TokenType.no,
      value: TokenType.no,
    },
  ];
  const validationSchema = Yup.object().shape({
    outcome: Yup.string().required(t('required')),
  });

  const formikProps = {
    initialValues: {
      outcome: TokenType.yes,
    },
    validationSchema,
    onSubmit: handleSubmit,
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <StyledFormWrapper backgroundColor={theme.palette.background.paper}>
          <Formik {...formikProps}>
            {({ isValid }) => (
              <Form>
                <Grid container spacing={3} direction="column">
                  <Grid item>
                    <Field
                      component={FormikToggleButton}
                      toggleButtonItems={outcomeItems}
                      name="outcome"
                    />
                  </Grid>
                  <Grid item>
                    <CustomButton
                      fullWidth
                      label={t('market:resolveMarket')}
                      type="submit"
                      disabled={!isValid}
                    />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </StyledFormWrapper>
      </Fade>
    </Modal>
  );
};
